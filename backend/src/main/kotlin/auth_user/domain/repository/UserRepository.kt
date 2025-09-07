package auth_user.domain.repository

import auth_user.domain.models.UserModel
import com.spender.core.either.Either
import com.spender.core.failure.Failure
import org.bson.types.ObjectId

interface UserRepository {
    suspend fun insert(user: UserModel): Either<Failure, UserModel>
    suspend fun findByEmail(email: String): Either<Failure, UserModel>
}