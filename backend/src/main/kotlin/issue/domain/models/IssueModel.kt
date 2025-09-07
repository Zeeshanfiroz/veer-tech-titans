package com.spender.issue.domain.models

import com.typer.core.serialization.ObjectIdSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.bson.Document
import org.bson.types.ObjectId

@Serializable
data class IssueModel(
    @SerialName("_id")
    @Serializable(with = ObjectIdSerializer::class)
    val id: ObjectId? = null,
    @Serializable(with = ObjectIdSerializer::class)
    val userId: ObjectId? = null,
    val issue: String = "Road Damage",
    val state: String = "Tamil Nadu",
    val district: String = "Chennai",
    val block: String = "Tambaram",
    val citizenName: String = "John Doe",
    val status: String = "Pending",
    val date: String = "2023-05-01",
    val isVerified: Boolean = false,
    val photoUrls: List<String> = listOf("https://example.com/photo1.jpg", "https://example.com/photo2.jpg"),
    val description: String = "The road is damaged and needs repair.",
) {
    fun toDocument(): Document {
        val jsonString = Json.encodeToString(this)
        val document = Document.parse(jsonString)

        if (id != null) {
            document["_id"] = id
        } else {
            document.remove("_id")
        }

        return document
    }

    companion object {
        private val json = Json {
            ignoreUnknownKeys = true
        }

        fun fromDocument(document: Document): IssueModel {
            val mutableDoc = Document(document)
            document["_id"]?.let { objectId ->
                if (objectId is ObjectId) {
                    mutableDoc["_id"] = objectId.toHexString()
                }
            }

            return json.decodeFromString(mutableDoc.toJson())
        }
    }
}
