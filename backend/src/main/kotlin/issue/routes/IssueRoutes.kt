package com.spender.issue.routes

import com.spender.core.either.Either
import com.spender.core.request_model.EmailRequest
import com.spender.issue.domain.models.IssueModel
import com.spender.issue.domain.repository.IssueRepository
import io.ktor.http.HttpStatusCode
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.put
import io.ktor.server.routing.route
import kotlinx.serialization.Serializable
import org.koin.ktor.ext.inject
import kotlin.getValue

@Serializable
data class IssueDetails(
    val state: String,
    val district: String,
    val block: String
)

@Serializable
data class IssueResponse(
    val status: String,
)

fun Route.issueRoutes() {
    val repository by inject<IssueRepository>()

    route("/api") {
        get("/problems") {
            val details = call.receive<IssueDetails>()
            val res = repository.findByDetails(details.state, details.district, details.block)
            if (res is Either.Right) {
                call.respond(res.value)
            } else {
                call.respond(HttpStatusCode.Unauthorized, mapOf("error" to "Unauthorized"))
            }
        }
        get("/problem/{id}") {
            val id = call.receive<String>()
            val res = repository.findById(id)
            if (res is Either.Right) {
                call.respond(res.value)
            } else {
                call.respond(HttpStatusCode.Unauthorized,
                    mapOf("error" to "Unauthorized")
                )
            }
        }
        put("/problem/{id}") {
            val id = call.queryParameters["id"]
            val issue = call.receive<IssueResponse>()
            val res = repository.update(id!!, issue.status)
            if (res is Either.Right) {
                call.respond(res.value)
            } else {
                call.respond(HttpStatusCode.Unauthorized,
                    mapOf("error" to "Unauthorized")
                )
            }
        }
        post("/user/new-problem") {
            val issue = call.receive<IssueModel>()
            val res = repository.insert(issue)
            if (res is Either.Right) {
                call.respond(res.value)
            } else {
                call.respond(HttpStatusCode.Unauthorized,
                    mapOf("error" to "Unauthorized")
                )
            }
        }
        post("/user/problems") {
            val details = call.receive<EmailRequest>().email
            val res = repository.findUserProblems(details)
            if (res is Either.Right) {
                call.respond(res.value)
            } else {
                call.respond(HttpStatusCode.Unauthorized, mapOf("error" to "Unauthorized"))
            }
        }
    }
}