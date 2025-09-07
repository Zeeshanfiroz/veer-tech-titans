package auth_authority.infrastructure.repository

import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters
import com.spender.auth_authority.domain.models.AuthorityModel
import com.spender.auth_authority.domain.repository.AuthorityRepository
import com.spender.core.either.Either
import com.spender.core.failure.Failure
import com.spender.core.failure.ServerFailure
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class AuthorityRepositoryImpl(
    mongoDatabase: MongoDatabase
): AuthorityRepository {
    companion object {
        private const val USER_COLLECTION = "authorities"
    }
    private val collection = mongoDatabase.getCollection(USER_COLLECTION)

    override suspend fun insert(authority: AuthorityModel): Either<Failure, AuthorityModel> = withContext(Dispatchers.IO) {
        try {
            val existingAuthority = collection.find(Filters.eq("email", authority.email)).first()
            if (existingAuthority != null) {
                return@withContext Either.Left(ServerFailure("User already exists"))
            }

            val result = collection.insertOne(authority.toDocument())
            if (result.wasAcknowledged()) {
                return@withContext Either.Right(authority.copy(id = result.insertedId?.asObjectId()?.value))
            }
            return@withContext Either.Left(ServerFailure("Error inserting authority"))
        } catch (e: Exception) {
            return@withContext Either.Left(ServerFailure("Error inserting authority: ${e.message}"))
        }
    }

    override suspend fun findByEmail(email: String): Either<Failure, AuthorityModel> = withContext(Dispatchers.IO) {
        try {
            val document = collection.find(Filters.eq("email", email)).first()
            if (document == null) {
                return@withContext Either.Left(ServerFailure("User not found"))
            } else {
                return@withContext Either.Right(AuthorityModel.fromDocument(document))
            }
        } catch (e: Exception) {
            return@withContext Either.Left(ServerFailure("Error finding user by email: ${e.message}"))
        }
    }
}