package com.myapp.civic_reporter.models

data class Report(
    val id: String? = null,
    val title: String,
    val description: String,
    val category: String,
    val latitude: Double,
    val longitude: Double,
    val address: String,
    val imageUrl: String? = null,
    val status: String = "submitted", // submitted, in_progress, resolved
    val timestamp: Long = System.currentTimeMillis(),
    val userEmail: String? = null
)