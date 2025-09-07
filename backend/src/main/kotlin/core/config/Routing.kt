package com.spender.core.config

import auth_user.routes.userRoutes
import com.spender.auth_authority.routes.authorityRoutes
import com.spender.issue.routes.issueRoutes
import io.ktor.server.application.Application
import io.ktor.server.routing.routing

fun Application.configureRouting() {
    routing {
        userRoutes()
        authorityRoutes()
        issueRoutes()
    }
}
