package com.spender.core.request_model

import kotlinx.serialization.Serializable

@Serializable
data class EmailRequest(
    val email: String
)