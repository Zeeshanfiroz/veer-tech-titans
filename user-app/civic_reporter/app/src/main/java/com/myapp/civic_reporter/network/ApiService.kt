package com.myapp.civic_reporter.network

import com.myapp.civic_reporter.models.ApiResponse
import com.myapp.civic_reporter.models.LoginRequest
import com.myapp.civic_reporter.models.LoginResponse
import com.myapp.civic_reporter.models.ProblemListRequest
import com.myapp.civic_reporter.models.Report
import com.myapp.civic_reporter.models.UploadResponse
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.*

interface ApiService {

    // Login/Signup: /login/user (POST request)
    // The LoginRequest now supports both email and userId
    @POST("login/user")
    suspend fun loginUser(@Body request: LoginRequest): Response<ApiResponse<LoginResponse>>

    @Multipart
    @POST("user/new-problem")
    suspend fun submitReport(
        @Part("title") title: RequestBody,
        @Part("description") description: RequestBody,
        @Part("category") category: RequestBody,
        @Part("latitude") latitude: RequestBody,
        @Part("longitude") longitude: RequestBody,
        @Part("address") address: RequestBody,
        @Part("user_id") userId: RequestBody,
        @Part image: MultipartBody.Part?
    ): Response<ApiResponse<UploadResponse>>


    @POST("user/problems")
    suspend fun getUserReports(@Body request: ProblemListRequest): Response<ApiResponse<List<Report>>>

    @POST("user/problems/{id}")
    suspend fun getProblemDetails(
        @Path("id") reportId: String,
        @Body request: ProblemListRequest
    ): Response<ApiResponse<Report>>

}