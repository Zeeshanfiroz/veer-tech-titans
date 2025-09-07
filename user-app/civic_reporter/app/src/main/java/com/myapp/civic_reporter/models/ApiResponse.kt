package com.myapp.civic_reporter.models

data class ApiResponse<T>(
    val success: Boolean,
    val message: String,
    val data: T?,
)