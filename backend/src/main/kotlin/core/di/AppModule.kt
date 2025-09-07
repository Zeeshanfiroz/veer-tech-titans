package com.spender.core.di

import auth_user.domain.repository.UserRepository
import com.spender.core.hash.PasswordHasher
import auth_authority.infrastructure.repository.AuthorityRepositoryImpl
import auth_user.infrastructure.repository.UserRepositoryImpl
import com.spender.auth_authority.domain.repository.AuthorityRepository
import com.spender.issue.domain.repository.IssueRepository
import com.spender.issue.infrastructure.repository.IssueRepositoryImpl
import org.koin.core.module.dsl.singleOf
import org.koin.dsl.bind
import org.koin.dsl.module

val appModule = module {
    singleOf(::PasswordHasher)
    singleOf(::UserRepositoryImpl) bind(UserRepository::class)
    singleOf(::AuthorityRepositoryImpl) bind(AuthorityRepository::class)
    singleOf(::IssueRepositoryImpl) bind(IssueRepository::class)
}