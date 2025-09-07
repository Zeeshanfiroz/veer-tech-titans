package com.myapp.civic_reporter.activities

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.android.material.button.MaterialButton
import com.google.android.material.chip.Chip
import com.myapp.civic_reporter.R
import com.myapp.civic_reporter.models.Report
import java.text.SimpleDateFormat
import java.util.*

class ReportAdapter(
    private val reports: List<Report>,
    private val onItemClick: ((Report) -> Unit)? = null
) : RecyclerView.Adapter<ReportAdapter.ReportViewHolder>() {

    class ReportViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val imageReport: ImageView = view.findViewById(R.id.imageReport)
        val textTitle: TextView = view.findViewById(R.id.textTitle)
        val textStatus: TextView = view.findViewById(R.id.textStatus)
        val chipCategory: Chip = view.findViewById(R.id.chipCategory)
        val textAddress: TextView = view.findViewById(R.id.textAddress)
        val textDate: TextView = view.findViewById(R.id.textDate)
        val buttonViewDetails: MaterialButton = view.findViewById(R.id.buttonViewDetails)

        val stepSubmitted: View = view.findViewById(R.id.stepSubmitted)
        val stepInProgress: View = view.findViewById(R.id.stepInProgress)
        val stepResolved: View = view.findViewById(R.id.stepResolved)
        val lineToProgress: View = view.findViewById(R.id.lineToProgress)
        val lineToResolved: View = view.findViewById(R.id.lineToResolved)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ReportViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_report, parent, false)
        return ReportViewHolder(view)
    }

    override fun onBindViewHolder(holder: ReportViewHolder, position: Int) {
        val report = reports[position]
        val context = holder.itemView.context

        holder.textTitle.text = report.title
        holder.chipCategory.text = report.category
        holder.textAddress.text = report.address

        holder.textDate.text = "2 days ago" // Placeholder - replace with actual date formatting

        when (report.status.lowercase()) {
            "submitted" -> {
                holder.textStatus.text = "SUBMITTED"
                holder.textStatus.setBackgroundResource(R.drawable.status_chip_submitted)
                updateProgressIndicators(holder, 1)
            }
            "in_progress" -> {
                holder.textStatus.text = "IN PROGRESS"
                holder.textStatus.setBackgroundResource(R.drawable.status_chip_in_progress)
                updateProgressIndicators(holder, 2)
            }
            "resolved" -> {
                holder.textStatus.text = "RESOLVED"
                holder.textStatus.setBackgroundResource(R.drawable.status_chip_resolved)
                updateProgressIndicators(holder, 3)
            }
            else -> {
                holder.textStatus.text = "UNKNOWN"
                holder.textStatus.setBackgroundColor(
                    ContextCompat.getColor(context, android.R.color.darker_gray)
                )
                updateProgressIndicators(holder, 1)
            }
        }

        if (!report.imageUrl.isNullOrEmpty()) {
            Glide.with(context)
                .load(report.imageUrl)
                .placeholder(R.drawable.ic_image_placeholder)
                .error(R.drawable.ic_image_placeholder)
                .centerCrop()
                .into(holder.imageReport)
        } else {
            holder.imageReport.setImageResource(R.drawable.ic_image_placeholder)
        }

        // Set click listeners
        holder.itemView.setOnClickListener {
            onItemClick?.invoke(report)
        }

        holder.buttonViewDetails.setOnClickListener {
            onItemClick?.invoke(report)
        }
    }

    private fun updateProgressIndicators(holder: ReportViewHolder, currentStep: Int) {
        val context = holder.itemView.context
        val activeColor = ContextCompat.getColor(context, R.color.primary)
        val inactiveColor = ContextCompat.getColor(context, R.color.border_light)
        val lineActiveColor = ContextCompat.getColor(context, R.color.primary)
        val lineInactiveColor = ContextCompat.getColor(context, R.color.border_light)

        when (currentStep) {
            1 -> { // Submitted
                holder.stepSubmitted.setBackgroundResource(R.drawable.progress_step_active)
                holder.stepInProgress.setBackgroundResource(R.drawable.progress_step_inactive)
                holder.stepResolved.setBackgroundResource(R.drawable.progress_step_inactive)
                holder.lineToProgress.setBackgroundColor(lineInactiveColor)
                holder.lineToResolved.setBackgroundColor(lineInactiveColor)
            }
            2 -> { // In Progress
                holder.stepSubmitted.setBackgroundResource(R.drawable.progress_step_active)
                holder.stepInProgress.setBackgroundResource(R.drawable.progress_step_active)
                holder.stepResolved.setBackgroundResource(R.drawable.progress_step_inactive)
                holder.lineToProgress.setBackgroundColor(lineActiveColor)
                holder.lineToResolved.setBackgroundColor(lineInactiveColor)
            }
            3 -> { // Resolved
                holder.stepSubmitted.setBackgroundResource(R.drawable.progress_step_active)
                holder.stepInProgress.setBackgroundResource(R.drawable.progress_step_active)
                holder.stepResolved.setBackgroundResource(R.drawable.progress_step_active)
                holder.lineToProgress.setBackgroundColor(lineActiveColor)
                holder.lineToResolved.setBackgroundColor(lineActiveColor)
            }
        }
    }

    override fun getItemCount() = reports.size
}