package auth_user.routes

import auth_user.domain.models.UserModel
import auth_user.domain.repository.UserRepository
import com.spender.core.either.Either
import com.spender.core.hash.PasswordHasher
import com.spender.core.request_model.EmailRequest
import com.spender.core.response_model.ResponseModel
import io.ktor.http.HttpStatusCode
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.route
import org.koin.ktor.ext.inject

fun Route.userRoutes() {
    val repository by inject<UserRepository>()
    val passwordHasher by inject<PasswordHasher>()

    route("/api") {
        post("/auth/login/user") {
            val user = call.receive<UserModel>()
            val res = repository.findByEmail(user.email)
            if (res is Either.Right) {
                val isVerified = passwordHasher.verify(user.password!!, res.value.password!!)
                if (isVerified) {
                    call.respond(ResponseModel(
                        success = true,
                        message = "Successfully logged in"
                    ))
                } else {
                    call.respond(HttpStatusCode.Unauthorized,
                        ResponseModel(
                            success = false,
                            message = "Unauthorized"
                        )
                    )
                }
            } else {
                val newUser = repository.insert(user.copy(password = passwordHasher.hash(user.password!!)))
                if (newUser is Either.Right) {
                    call.respond(
                        ResponseModel(
                            success = true,
                            message = "Successfully registered"
                        )
                    )
                } else {
                    call.respond(HttpStatusCode.InternalServerError,
                        ResponseModel(
                            success = false,
                            message = "Internal Server Error"
                        )
                    )
                }
            }
        }
        get("/user/me") {
            val email = call.receive<EmailRequest>().email
            val res = repository.findByEmail(email)
            if (res is Either.Right) {
                call.respond(
                    ResponseModel(
                        success = true,
                        message = "Successfully fetched user",
                        data = res.value.copy(password = null)
                    )
                )
            } else {
                call.respond(HttpStatusCode.Unauthorized,
                    ResponseModel(
                        success = false,
                        message = "Unauthorized"
                    )
                )
            }
        }
    }
}