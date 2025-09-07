package com.myapp.civic_reporter.utils

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import java.io.File
import java.io.FileOutputStream
import java.io.InputStream

class ImageHelper(private val context: Context) {

    fun createImageFile(): File {
        val timeStamp = System.currentTimeMillis()
        val fileName = "civic_report_$timeStamp.jpg"
        return File(context.getExternalFilesDir(null), fileName)
    }

    fun compressImage(imageUri: Uri, maxSizeKB: Int = 500): File? {
        return try {
            val inputStream: InputStream? = context.contentResolver.openInputStream(imageUri)
            val originalBitmap = BitmapFactory.decodeStream(inputStream)
            inputStream?.close()

            var quality = 90
            val outputFile = createImageFile()

            do {
                val outputStream = FileOutputStream(outputFile)
                originalBitmap.compress(Bitmap.CompressFormat.JPEG, quality, outputStream)
                outputStream.close()
                quality -= 10
            } while (outputFile.length() / 1024 > maxSizeKB && quality > 10)

            outputFile
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}