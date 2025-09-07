package auth_user.infrastructure.repository

import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters
import auth_user.domain.models.UserModel
import auth_user.domain.repository.UserRepository
import com.spender.core.either.Either
import com.spender.core.failure.Failure
import com.spender.core.failure.ServerFailure
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class UserRepositoryImpl(
    mongoDatabase: MongoDatabase
): UserRepository {
    companion object {
        private const val USER_COLLECTION = "users"
    }
    private val collection = mongoDatabase.getCollection(USER_COLLECTION)

    override suspend fun insert(user: UserModel): Either<Failure, UserModel> = withContext(Dispatchers.IO) {
        try {
            val existingUser = collection.find(Filters.eq("email", user.email)).first()
            if (existingUser != null) {
                return@withContext Either.Left(ServerFailure("User already exists"))
            }

            val result = collection.insertOne(user.toDocument())
            if (result.wasAcknowledged()) {
                return@withContext Either.Right(user.copy(id = result.insertedId?.asObjectId()?.value))
            }
            return@withContext Either.Left(ServerFailure("Error inserting user"))
        } catch (e: Exception) {
            return@withContext Either.Left(ServerFailure("Error inserting user: ${e.message}"))
        }
    }

    override suspend fun findByEmail(email: String): Either<Failure, UserModel> = withContext(Dispatchers.IO) {
        try {
            val document = collection.find(Filters.eq("email", email)).first()
            if (document == null) {
                return@withContext Either.Left(ServerFailure("User not found"))
            } else {
                return@withContext Either.Right(UserModel.fromDocument(document))
            }
        } catch (e: Exception) {
            return@withContext Either.Left(ServerFailure("Error finding user by email: ${e.message}"))
        }
    }
}