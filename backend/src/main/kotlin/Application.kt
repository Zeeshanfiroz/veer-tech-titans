package com.spender

import com.spender.core.config.configureRouting
import com.spender.core.config.di
import core.config.configureCORS
import io.github.cdimascio.dotenv.dotenv
import io.ktor.serialization.kotlinx.json.json
import io.ktor.server.application.*
import io.ktor.server.netty.EngineMain
import io.ktor.server.plugins.contentnegotiation.ContentNegotiation

fun main(args: Array<String>) {
    val dotenv = dotenv()
    dotenv.entries().forEach { entry ->
        System.setProperty(entry.key, entry.value)
    }
    EngineMain.main(args)
}

fun Application.module() {
    di()
    install(ContentNegotiation) {
        json()
    }
    configureCORS()
    configureRouting()
}
