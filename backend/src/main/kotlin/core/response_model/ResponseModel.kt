package com.spender.core.response_model

import auth_user.domain.models.UserModel
import kotlinx.serialization.Serializable

@Serializable
data class ResponseModel(
    val success: Boolean,
    val message: String,
    val data: UserModel? = null
)
