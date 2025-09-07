package com.spender.auth_authority.domain.repository

import com.spender.auth_authority.domain.models.AuthorityModel
import com.spender.core.either.Either
import com.spender.core.failure.Failure

interface AuthorityRepository {
    suspend fun insert(authority: AuthorityModel): Either<Failure, AuthorityModel>
    suspend fun findByEmail(email: String): Either<Failure, AuthorityModel>
}