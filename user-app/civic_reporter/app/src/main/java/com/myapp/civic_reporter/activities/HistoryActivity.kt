package com.myapp.civic_reporter.activities

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.appbar.MaterialToolbar
import com.myapp.civic_reporter.R
import com.myapp.civic_reporter.models.ProblemListRequest
import com.myapp.civic_reporter.models.Report
import com.myapp.civic_reporter.network.RetrofitClient
import kotlinx.coroutines.launch

class HistoryActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var progressBar: ProgressBar
    private lateinit var textNoReports: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_history)

        val toolbar = findViewById<MaterialToolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.setDisplayShowHomeEnabled(true)

        initializeViews()
        setupRecyclerView()
        loadReports()
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


    private fun initializeViews() {
        recyclerView = findViewById(R.id.recyclerViewReports)
        progressBar = findViewById(R.id.progressBar)
        textNoReports = findViewById(R.id.textNoReports)
    }

    private fun setupRecyclerView() {
        recyclerView.layoutManager = LinearLayoutManager(this)
    }

    private fun loadReports() {
        progressBar.visibility = View.VISIBLE
        textNoReports.visibility = View.GONE

        val prefs = getSharedPreferences("civic_reporter_prefs", MODE_PRIVATE)
        val userEmail = prefs.getString("user_email", null)

        if (userEmail == null) {
            showError("User not logged in.")
            return
        }

        lifecycleScope.launch {
            try {
                val request = ProblemListRequest(userEmail)
                val response = RetrofitClient.apiService.getUserReports(request)

                progressBar.visibility = View.GONE

                if (response.isSuccessful && response.body()?.success == true) {
                    val reports = response.body()?.data
                    if (reports != null) {
                        displayReports(reports)
                    } else {
                        showError("No reports found.")
                    }
                } else {
                    val errorMessage = response.body()?.message ?: "Failed to fetch reports."
                    showError(errorMessage)
                }
            } catch (e: Exception) {
                Log.e("HistoryActivity", "Fetch Error: ${e.message}", e)
                progressBar.visibility = View.GONE
                showError("Failed to load reports: ${e.message}")
            }
        }
    }

    private fun displayReports(reports: List<Report>) {
        if (reports.isEmpty()) {
            textNoReports.visibility = View.VISIBLE
            recyclerView.visibility = View.GONE
        } else {
            textNoReports.visibility = View.GONE
            recyclerView.visibility = View.VISIBLE
            recyclerView.adapter = ReportAdapter(reports)
        }
    }

    private fun showError(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show()
        textNoReports.text = message
        textNoReports.visibility = View.VISIBLE
        recyclerView.visibility = View.GONE
    }
}
