package com.spender.issue.domain.repository

import com.spender.core.either.Either
import com.spender.core.failure.Failure
import com.spender.issue.domain.models.IssueModel

interface IssueRepository {
    suspend fun findByDetails(state: String, district: String, block: String): Either<Failure, List<IssueModel>>
    suspend fun findById(id: String): Either<Failure, IssueModel>
    suspend fun insert(issue: IssueModel): Either<Failure, IssueModel>
    suspend fun update(id: String, status: String): Either<Failure, Unit>
    suspend fun findUserProblems(email: String): Either<Failure, List<IssueModel>>

}