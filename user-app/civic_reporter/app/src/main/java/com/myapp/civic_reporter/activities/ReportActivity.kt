package com.myapp.civic_reporter.activities

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.*
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.FileProvider
import androidx.lifecycle.lifecycleScope
import com.bumptech.glide.Glide
import com.google.android.material.appbar.MaterialToolbar
import com.myapp.civic_reporter.R
import com.myapp.civic_reporter.network.RetrofitClient
import com.myapp.civic_reporter.utils.ImageHelper
import com.myapp.civic_reporter.utils.LocationHelper
import kotlinx.coroutines.launch
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import java.io.File

class ReportActivity : AppCompatActivity() {

    private lateinit var imagePreview: ImageView
    private lateinit var editTitle: EditText
    private lateinit var editDescription: EditText
    private lateinit var spinnerCategory: AutoCompleteTextView
    private lateinit var textLocation: TextView
    private lateinit var buttonSubmit: Button
    private lateinit var progressBar: ProgressBar
    private lateinit var textTakePhoto: TextView

    private lateinit var locationHelper: LocationHelper
    private lateinit var imageHelper: ImageHelper

    private var currentImageFile: File? = null
    private var currentLatitude: Double = 0.0
    private var currentLongitude: Double = 0.0
    private var currentAddress: String = ""

    private val categories = arrayOf("Pothole", "Streetlight", "Trash/Garbage", "Road Damage", "Water Issue", "Other")

    // Camera launcher
    private val takePictureLauncher = registerForActivityResult(
        ActivityResultContracts.TakePicture()
    ) { success ->
        if (success && currentImageFile != null) {
            Glide.with(this)
                .load(currentImageFile)
                .into(imagePreview)
            textTakePhoto.visibility = View.GONE
            imagePreview.visibility = View.VISIBLE
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_report)

        val toolbar = findViewById<MaterialToolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        initializeViews()
        setupHelpers()
        setupCategorySpinner()
        setupClickListeners()
        getCurrentLocation()
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
        imagePreview = findViewById(R.id.imagePreview)
        editTitle = findViewById(R.id.editTitle)
        editDescription = findViewById(R.id.editDescription)
        spinnerCategory = findViewById(R.id.spinnerCategory)
        textLocation = findViewById(R.id.textLocation)
        buttonSubmit = findViewById(R.id.buttonSubmit)
        progressBar = findViewById(R.id.progressBar)
        textTakePhoto = findViewById(R.id.textTakePhoto)
    }

    private fun setupHelpers() {
        locationHelper = LocationHelper(this)
        imageHelper = ImageHelper(this)
    }

    private fun setupCategorySpinner() {
        val adapter = ArrayAdapter(this, android.R.layout.simple_dropdown_item_1line, categories)
        spinnerCategory.setAdapter(adapter)
    }

    private fun setupClickListeners() {
        findViewById<View>(R.id.cardImagePreview).setOnClickListener {
            takePhoto()
        }

        buttonSubmit.setOnClickListener {
            submitReport()
        }
    }

    private fun takePhoto() {
        currentImageFile = imageHelper.createImageFile()
        if (currentImageFile == null) {
            Toast.makeText(this, "Could not create image file", Toast.LENGTH_SHORT).show()
            return
        }
        val imageUri = FileProvider.getUriForFile(
            this,
            "${packageName}.fileprovider",
            currentImageFile!!
        )
        takePictureLauncher.launch(imageUri)
    }

    private fun getCurrentLocation() {
        lifecycleScope.launch {
            try {
                val location = locationHelper.getCurrentLocation()
                if (location != null) {
                    currentLatitude = location.latitude
                    currentLongitude = location.longitude
                    currentAddress = locationHelper.getAddressFromLocation(
                        currentLatitude,
                        currentLongitude
                    )
                    textLocation.text = "📍 $currentAddress"
                } else {
                    textLocation.text = "Unable to get location. Please enable GPS."
                }
            } catch (e: Exception) {
                textLocation.text = "Location error: ${e.message}"
            }
        }
    }

    private fun submitReport() {
        val title = editTitle.text.toString().trim()
        val description = editDescription.text.toString().trim()
        val category = spinnerCategory.text.toString()

        if (title.isEmpty()) {
            editTitle.error = "Title is required"
            return
        }

        if (description.isEmpty()) {
            editDescription.error = "Description is required"
            return
        }

        if (category.isEmpty()) {
            Toast.makeText(this, "Please select a category", Toast.LENGTH_SHORT).show()
            return
        }

        if (currentImageFile == null) {
            Toast.makeText(this, "Please take a photo", Toast.LENGTH_SHORT).show()
            return
        }

        if (currentLatitude == 0.0 || currentLongitude == 0.0) {
            Toast.makeText(this, "Location not available", Toast.LENGTH_SHORT).show()
            return
        }

        progressBar.visibility = View.VISIBLE
        buttonSubmit.isEnabled = false

        lifecycleScope.launch {
            try {
                val prefs = getSharedPreferences("civic_reporter_prefs", MODE_PRIVATE)
                val userEmail = prefs.getString("user_email", null)

                if (userEmail == null) {
                    Toast.makeText(this@ReportActivity, "User not logged in.", Toast.LENGTH_SHORT).show()
                    return@launch
                }

                val compressedImageFile = currentImageFile?.let { file ->
                    imageHelper.compressImage(Uri.fromFile(file))
                } ?: currentImageFile

                if (compressedImageFile == null) {
                    progressBar.visibility = View.GONE
                    buttonSubmit.isEnabled = true
                    Toast.makeText(this@ReportActivity, "Failed to compress image.", Toast.LENGTH_SHORT).show()
                    return@launch
                }

                val titleBody = title.toRequestBody("text/plain".toMediaTypeOrNull())
                val descriptionBody = description.toRequestBody("text/plain".toMediaTypeOrNull())
                val categoryBody = category.toRequestBody("text/plain".toMediaTypeOrNull())
                val latitudeBody = currentLatitude.toString().toRequestBody("text/plain".toMediaTypeOrNull())
                val longitudeBody = currentLongitude.toString().toRequestBody("text/plain".toMediaTypeOrNull())
                val addressBody = currentAddress.toRequestBody("text/plain".toMediaTypeOrNull())
                val userIdBody = userEmail.toRequestBody("text/plain".toMediaTypeOrNull())

                val requestFile = compressedImageFile.asRequestBody("image/jpeg".toMediaTypeOrNull())
                val imagePart = MultipartBody.Part.createFormData("image", compressedImageFile.name, requestFile)

                val response = RetrofitClient.apiService.submitReport(
                    titleBody,
                    descriptionBody,
                    categoryBody,
                    latitudeBody,
                    longitudeBody,
                    addressBody,
                    userIdBody,
                    imagePart
                )

                progressBar.visibility = View.GONE
                buttonSubmit.isEnabled = true

                if (response.isSuccessful && response.body()?.success == true) {
                    Toast.makeText(this@ReportActivity, "Report submitted successfully!", Toast.LENGTH_LONG).show()
                    finish()
                } else {
                    val errorMessage = response.body()?.message ?: "Failed to submit report"
                    Toast.makeText(this@ReportActivity, errorMessage, Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Log.e("ReportActivity", "Submit Error: ${e.message}", e)
                progressBar.visibility = View.GONE
                buttonSubmit.isEnabled = true
                Toast.makeText(this@ReportActivity, "Error: ${e.message}", Toast.LENGTH_LONG).show()
            }
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        currentImageFile?.let { outState.putString("currentImagePath", it.absolutePath) }
    }

    override fun onRestoreInstanceState(savedInstanceState: Bundle) {
        super.onRestoreInstanceState(savedInstanceState)
        val path = savedInstanceState.getString("currentImagePath")
        if (path != null) {
            currentImageFile = File(path)
            if (currentImageFile!!.exists()) {
                Glide.with(this)
                    .load(currentImageFile)
                    .into(imagePreview)
                textTakePhoto.visibility = View.GONE
                imagePreview.visibility = View.VISIBLE
            }
        }
    }
}
