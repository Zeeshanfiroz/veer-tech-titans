package com.myapp.civic_reporter.activities

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.google.android.material.card.MaterialCardView
import com.myapp.civic_reporter.R
import com.myapp.civic_reporter.models.ProblemListRequest
import com.myapp.civic_reporter.network.RetrofitClient
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val allGranted = permissions.values.all { it }
        if (allGranted) {
            Toast.makeText(this, "Permissions granted", Toast.LENGTH_SHORT).show()
        } else {
            Toast.makeText(this, "Permissions required for app functionality", Toast.LENGTH_LONG).show()
        }
    }

    private lateinit var textTotalCount: TextView
    private lateinit var textResolvedCount: TextView
    private lateinit var textInProgressCount: TextView
    private lateinit var progressBarReports: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val toolbar = findViewById<com.google.android.material.appbar.MaterialToolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)

        initializeViews()
        checkAndRequestPermissions()
        setupClickListeners()
        fetchReportCounts()
    }

    override fun onResume() {
        super.onResume()
        fetchReportCounts()
    }

    private fun initializeViews() {
        textTotalCount = findViewById(R.id.textTotalCount)
        textResolvedCount = findViewById(R.id.textResolvedCount)
        textInProgressCount = findViewById(R.id.textInProgressCount)
        progressBarReports = findViewById(R.id.progressBarReports)
    }

    private fun checkAndRequestPermissions() {
        val requiredPermissions = mutableListOf(
            Manifest.permission.CAMERA,
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION
        )

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            requiredPermissions.add(Manifest.permission.READ_MEDIA_IMAGES)
        } else {
            requiredPermissions.add(Manifest.permission.READ_EXTERNAL_STORAGE)
        }

        val missingPermissions = requiredPermissions.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }

        if (missingPermissions.isNotEmpty()) {
            requestPermissionLauncher.launch(missingPermissions.toTypedArray())
        }
    }

    private fun setupClickListeners() {
        findViewById<MaterialCardView>(R.id.cardReportIssue).setOnClickListener {
            val intent = Intent(this, ReportActivity::class.java)
            startActivity(intent)
        }

        findViewById<MaterialCardView>(R.id.cardViewHistory).setOnClickListener {
            val intent = Intent(this, HistoryActivity::class.java)
            startActivity(intent)
        }
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            android.R.id.home -> {
                finish()
                true
            }
            R.id.action_profile -> {
                val intent = Intent(this, ProfileActivity::class.java)
                startActivity(intent)
                true
            }
            R.id.action_logout -> {
                val prefs = getSharedPreferences("civic_reporter_prefs", MODE_PRIVATE)
                prefs.edit().clear().apply()
                val intent = Intent(this, LoginActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                startActivity(intent)
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }

    private fun fetchReportCounts() {
        progressBarReports.visibility = View.VISIBLE
        textTotalCount.text = "0"
        textResolvedCount.text = "0"
        textInProgressCount.text = "0"

        val prefs = getSharedPreferences("civic_reporter_prefs", MODE_PRIVATE)
        val userEmail = prefs.getString("user_email", null)

        if (userEmail == null) {
            Toast.makeText(this, "User not logged in.", Toast.LENGTH_SHORT).show()
            progressBarReports.visibility = View.GONE
            return
        }

        lifecycleScope.launch {
            try {
                val request = ProblemListRequest(userEmail)
                val response = RetrofitClient.apiService.getUserReports(request)

                if (response.isSuccessful && response.body()?.success == true) {
                    val reports = response.body()?.data
                    if (reports != null) {
                        val totalCount = reports.size
                        val resolvedCount = reports.count { it.status.lowercase() == "resolved" }
                        val inProgressCount = reports.count { it.status.lowercase() == "in_progress" }

                        textTotalCount.text = totalCount.toString()
                        textResolvedCount.text = resolvedCount.toString()
                        textInProgressCount.text = inProgressCount.toString()
                    }
                } else {
                    Toast.makeText(this@MainActivity, "Failed to fetch report counts.", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Log.e("MainActivity", "Error fetching reports: ${e.message}", e)
                Toast.makeText(this@MainActivity, "Error loading data.", Toast.LENGTH_SHORT).show()
            } finally {
                progressBarReports.visibility = View.GONE
            }
        }
    }
}
