package com.spender.issue.infrastructure.repository

import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Updates.set
import com.spender.core.either.Either
import com.spender.core.failure.Failure
import com.spender.core.failure.ServerFailure
import com.spender.issue.domain.models.IssueModel
import com.spender.issue.domain.repository.IssueRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class IssueRepositoryImpl(
    mongoDatabase: MongoDatabase
): IssueRepository {

    companion object {
        private const val ISSUE_COLLECTION = "issues"
    }
    private val collection = mongoDatabase.getCollection(ISSUE_COLLECTION)
    override suspend fun findByDetails(
        state: String,
        district: String,
        block: String
    ): Either<Failure, List<IssueModel>> = withContext(Dispatchers.IO) {
        try {
            val filter = Filters.and(
                Filters.eq("state", state),
                Filters.eq("district", district),
                Filters.eq("block", block)
            )

            val issues = collection.find(filter).toList()
            return@withContext Either.Right(issues.map { IssueModel.fromDocument(it) })
        } catch (e: Exception) {
            return@withContext Either.Left(ServerFailure("Error finding issues: ${e.message}"))
        }
    }

    override suspend fun findById(id: String): Either<Failure, IssueModel> = withContext(Dispatchers.IO) {
        return@withContext try {
            val issue = collection.find(Filters.eq("_id", id)).first()
            if (issue == null) {
                Either.Left(ServerFailure("Issue not found"))
            } else {
                Either.Right(IssueModel.fromDocument(issue))
            }
        } catch (e: Exception) {
            Either.Left(ServerFailure("Error finding issue by id: ${e.message}"))
        }
    }

    override suspend fun insert(issue: IssueModel): Either<Failure, IssueModel> = withContext(Dispatchers.IO) {
        try {
            val result = collection.insertOne(issue.toDocument())
            if (result.wasAcknowledged()) {
                return@withContext Either.Right(issue.copy(id = result.insertedId?.asObjectId()?.value))
            }
            return@withContext Either.Left(ServerFailure("Error inserting issue"))
        } catch (e: Exception) {
            return@withContext Either.Left(ServerFailure("Error inserting issue: ${e.message}"))
        }
    }

    override suspend fun update(id: String, status: String): Either<Failure, Unit> = withContext(Dispatchers.IO) {
        try {
            val result = collection.updateOne(Filters.eq("_id", id), set("status", status))
            if (result.wasAcknowledged()) {
                return@withContext Either.Right(Unit)
            }
            return@withContext Either.Left(ServerFailure("Error updating issue"))
        } catch (e: Exception) {
            return@withContext Either.Left(ServerFailure("Error updating issue: ${e.message}"))
        }
    }
}