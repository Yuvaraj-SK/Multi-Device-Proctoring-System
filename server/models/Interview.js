import mongoose from "mongoose";

const interviewJoinToken = {
  type: String,
  required: true,
  unique: true,
  sparse: true,
  index: true
};

const interviewSchema = new mongoose.Schema(
  {
    interviewId: {
      type: String,
      unique: true,
      required: true,
      default: () => "INT-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9)
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    joinToken: interviewJoinToken,
    joinTokenExpiresAt: {
      type: Date,
      required: true
    },
    jobTitle: {
      type: String,
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    duration: {
      type: Number, // in minutes
      required: true
    },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
      index: true
    },
    videoUrl: {
      type: String,
      default: null
    },
    notes: {
      type: String,
      default: ""
    },
    riskScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },
    cancelReason: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Index for efficient queries
interviewSchema.index({ recruiterId: 1, status: 1 });
interviewSchema.index({ candidateId: 1, status: 1 });
interviewSchema.index({ startTime: 1 });

export default mongoose.model("Interview", interviewSchema);
