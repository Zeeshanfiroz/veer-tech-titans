package com.myapp.civic_reporter.activities

import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.util.Log
import android.util.Patterns
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputEditText
import com.myapp.civic_reporter.R
import com.myapp.civic_reporter.models.LoginRequest
import com.myapp.civic_reporter.models.LoginResponse
import com.myapp.civic_reporter.network.RetrofitClient
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {

    private lateinit var editEmail: TextInputEditText
    private lateinit var editPassword: TextInputEditText
    private lateinit var buttonLogin: MaterialButton
    private lateinit var buttonRegister: MaterialButton
    private lateinit var sharedPreferences: SharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        sharedPreferences = getSharedPreferences("civic_reporter_prefs", MODE_PRIVATE)

        if (isUserLoggedIn()) {
            navigateToMain()
            return
        }

        initializeViews()
        setupClickListeners()
    }

    private fun initializeViews() {
        editEmail = findViewById(R.id.editEmail)
        editPassword = findViewById(R.id.editPassword)
        buttonLogin = findViewById(R.id.buttonLogin)
        buttonRegister = findViewById(R.id.buttonRegister)
    }

    private fun setupClickListeners() {
        buttonLogin.setOnClickListener {
            performLogin()
        }

        buttonRegister.setOnClickListener {
            performRegister()
        }
    }

    private fun performLogin() {
        val email = editEmail.text.toString().trim()
        val password = editPassword.text.toString().trim()

        if (!isValidLoginInput(email, password)) return

        buttonLogin.isEnabled = false
        buttonLogin.text = "Logging in..."

        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.loginUser(LoginRequest(email = email, password = password))
                if (response.isSuccessful && response.body() != null) {
                    val loginResponse = response.body()!!
                    if (loginResponse.success) {
                        saveUserSession(email)
                        navigateToMain()
                    } else {
                        Toast.makeText(this@LoginActivity, loginResponse.message, Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Toast.makeText(this@LoginActivity, "Login failed. Check your credentials.", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Log.e("LoginActivity", "Login Error: ${e.message}", e)
                Toast.makeText(this@LoginActivity, "Login failed: ${e.message}", Toast.LENGTH_LONG).show()
            } finally {
                buttonLogin.isEnabled = true
                buttonLogin.text = "Sign In"
            }
        }
    }

    private fun performRegister() {
        val email = editEmail.text.toString().trim()
        val password = editPassword.text.toString().trim()

        if (!isValidLoginInput(email, password)) return

        buttonRegister.isEnabled = false
        buttonRegister.text = "Creating Account..."

        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.loginUser(LoginRequest(email = email, password = password))
                if (response.isSuccessful && response.body() != null) {
                    val loginResponse = response.body()!!
                    if (loginResponse.success) {
                        saveUserSession(email)
                        Toast.makeText(this@LoginActivity, "Account created successfully!", Toast.LENGTH_SHORT).show()
                        navigateToMain()
                    } else {
                        Toast.makeText(this@LoginActivity, loginResponse.message, Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Toast.makeText(this@LoginActivity, "Registration failed.", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Log.e("LoginActivity", "Registration Error: ${e.message}", e)
                Toast.makeText(this@LoginActivity, "Registration failed: ${e.message}", Toast.LENGTH_LONG).show()
            } finally {
                buttonRegister.isEnabled = true
                buttonRegister.text = "Create New Account"
            }
        }
    }

    private fun isValidLoginInput(email: String, password: String): Boolean {
        if (email.isEmpty()) {
            editEmail.error = "Email is required"
            return false
        }
        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            editEmail.error = "Please enter a valid email"
            return false
        }
        if (password.isEmpty()) {
            editPassword.error = "Password is required"
            return false
        }
        if (password.length < 6) {
            editPassword.error = "Password must be at least 6 characters"
            return false
        }
        return true
    }

    private fun saveUserSession(email: String) {
        sharedPreferences.edit()
            .putBoolean("is_logged_in", true)
            .putString("user_email", email)
            .apply()
    }

    private fun isUserLoggedIn(): Boolean {
        return sharedPreferences.getBoolean("is_logged_in", false)
    }

    private fun navigateToMain() {
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()
    }
}