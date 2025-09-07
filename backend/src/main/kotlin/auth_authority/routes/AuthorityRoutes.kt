package com.spender.auth_authority.routes

import com.spender.auth_authority.domain.models.AuthorityModel
import com.spender.auth_authority.domain.repository.AuthorityRepository
import com.spender.core.either.Either
import com.spender.core.hash.PasswordHasher
import com.spender.core.request_model.EmailRequest
import io.ktor.http.HttpStatusCode
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.route
import org.koin.ktor.ext.inject
import kotlin.to

fun Route.authorityRoutes() {
    val repository by inject<AuthorityRepository>()
    val passwordHasher by inject<PasswordHasher>()

    route("/api") {
        post("/auth/login/authority") {
            val authority = call.receive<AuthorityModel>()
            val res = repository.findByEmail(authority.email)
            if (res is Either.Right) {
                val isVerified = passwordHasher.verify(authority.password!!, res.value.password!!)
                if (isVerified) {
                    call.respond(mapOf("Success" to "Successfully logged in"))
                } else {
                    call.respond(HttpStatusCode.Unauthorized,
                        mapOf("error" to "Unauthorized")
                    )
                }
            } else {
                val newAuthority = repository.insert(authority.copy(password = passwordHasher.hash(authority.password!!)))
                if (newAuthority is Either.Right) {
                    call.respond(mapOf("Success" to "Successfully registered"))
                } else {
                    call.respond(HttpStatusCode.InternalServerError,
                        mapOf("error" to "Internal Server Error")
                    )
                }
            }
        }
        get("/authority/me") {
            val email = call.receive<EmailRequest>().email
            val res = repository.findByEmail(email)
            if (res is Either.Right) {
                call.respond(res.value.copy(password = null))
            } else {
                call.respond(HttpStatusCode.Unauthorized,
                    mapOf("error" to "Unauthorized")
                )
            }
        }
    }
}