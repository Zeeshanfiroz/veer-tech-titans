package com.myapp.civic_reporter.models

import com.google.gson.annotations.SerializedName

data class ProblemListRequest(
    @SerializedName("user_email")
    val userEmail: String? = null
)