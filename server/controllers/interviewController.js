import Interview from "../models/Interview.js";
import User from "../models/User.js";
import { randomBytes } from "node:crypto";

// Create new interview (recruiter only)
export const createInterview = async (req, res) => {
  try {
    const { candidateEmail, jobTitle, startTime, endTime } = req.body;
    const recruiterId = req.user._id;

    // Validate required fields
    if (!candidateEmail || !jobTitle || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (candidateEmail, jobTitle, startTime, endTime)"
      });
    }

    // Find candidate by email
    const candidate = await User.findOne({ email: candidateEmail });
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found with this email"
      });
    }

    // Validate times
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: "Start time must be before end time"
      });
    }

    // Calculate duration in minutes
    const duration = Math.round((end - start) / (1000 * 60));

    // Create interview
    const interview = await Interview.create({
      recruiterId,
      candidateId: candidate._id,
      jobTitle,
      startTime: start,
      endTime: end,
      duration,
      joinToken: randomBytes(32).toString("hex"),
      joinTokenExpiresAt: end
    });

    // Populate recruiter and candidate info
    await interview.populate("recruiterId", "name email");
    await interview.populate("candidateId", "name email");

    res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Validate a candidate's secure join link.
export const validateJoinToken = async (req, res) => {
  try {
    const { joinToken } = req.params;
    const userId = req.user._id.toString();

    const interview = await Interview.findOne({ joinToken }).select(
      "candidateId interviewId jobTitle startTime endTime duration status joinTokenExpiresAt"
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired interview link"
      });
    }

    if (interview.candidateId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this interview"
      });
    }

    const now = new Date();
    if (
      interview.status === "cancelled" ||
      interview.status === "completed" ||
      interview.joinTokenExpiresAt <= now
    ) {
      return res.status(410).json({
        success: false,
        message: "Invalid or expired interview link"
      });
    }

    return res.status(200).json({
      success: true,
      interview: {
        interviewId: interview.interviewId,
        jobTitle: interview.jobTitle,
        startTime: interview.startTime,
        endTime: interview.endTime,
        duration: interview.duration,
        status: interview.status
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get interview by ID
export const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (req.user.role === "candidate") {
      return res.status(403).json({
        success: false,
        message: "Use the secure interview join link to access this interview"
      });
    }

    const interview = await Interview.findById(id)
      .populate("recruiterId", "name email")
      .populate("candidateId", "name email");

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    // Check authorization: only recruiter or candidate can view
    if (
      interview.recruiterId._id.toString() !== userId.toString() &&
      interview.candidateId._id.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this interview"
      });
    }

    res.status(200).json({
      success: true,
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get recruiter's interviews
export const getRecruiterInterviews = async (req, res) => {
  try {
    const recruiterId = req.user._id;
    const { status } = req.query;

    let query = { recruiterId };
    if (status) {
      query.status = status;
    }

    const interviews = await Interview.find(query)
      .populate("recruiterId", "name email")
      .populate("candidateId", "name email")
      .sort({ startTime: 1 });

    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get candidate's interviews
export const getCandidateInterviews = async (req, res) => {
  return res.status(403).json({
    success: false,
    message: "Use the secure interview join link to access interviews"
  });
};

// Candidate actions must enter through the secure join-link flow.
const rejectCandidateDirectAccess = (req, res) => {
  if (req.user.role === "candidate") {
    res.status(403).json({
      success: false,
      message: "Use the secure interview join link to access this interview"
    });
    return true;
  }
  return false;
};

// Update interview (recruiter only)
export const updateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { jobTitle, startTime, endTime, notes } = req.body;
    const userId = req.user._id;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    // Check authorization: only recruiter who created can update
    if (interview.recruiterId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the recruiter who created this interview can update it"
      });
    }

    // Don't allow updates to completed or cancelled interviews
    if (interview.status === "completed" || interview.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: `Cannot update a ${interview.status} interview`
      });
    }

    // Update fields
    if (jobTitle) interview.jobTitle = jobTitle;
    if (notes !== undefined) interview.notes = notes;

    if (startTime || endTime) {
      const start = startTime ? new Date(startTime) : interview.startTime;
      const end = endTime ? new Date(endTime) : interview.endTime;

      if (start >= end) {
        return res.status(400).json({
          success: false,
          message: "Start time must be before end time"
        });
      }

      interview.startTime = start;
      interview.endTime = end;
      interview.duration = Math.round((end - start) / (1000 * 60));
    }

    await interview.save();
    await interview.populate("recruiterId", "name email");
    await interview.populate("candidateId", "name email");

    res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Cancel interview
export const cancelInterview = async (req, res) => {
  try {
    if (rejectCandidateDirectAccess(req, res)) return;

    const { id } = req.params;
    const { cancelReason } = req.body;
    const userId = req.user._id;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    // Check authorization: recruiter or candidate can cancel
    if (
      interview.recruiterId.toString() !== userId.toString() &&
      interview.candidateId.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this interview"
      });
    }

    // Can't cancel already completed or cancelled interviews
    if (interview.status === "completed" || interview.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel a ${interview.status} interview`
      });
    }

    interview.status = "cancelled";
    interview.cancelReason = cancelReason || null;
    await interview.save();

    await interview.populate("recruiterId", "name email");
    await interview.populate("candidateId", "name email");

    res.status(200).json({
      success: true,
      message: "Interview cancelled successfully",
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Complete interview (recruiter only)
export const completeInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes, riskScore, videoUrl } = req.body;
    const userId = req.user._id;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    // Check authorization: only recruiter can complete
    if (interview.recruiterId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the recruiter can mark this interview as complete"
      });
    }

    // Can only complete scheduled or in-progress interviews
    if (interview.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "This interview is already completed"
      });
    }

    if (interview.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cannot complete a cancelled interview"
      });
    }

    interview.status = "completed";
    if (notes !== undefined) interview.notes = notes;
    if (riskScore !== undefined) interview.riskScore = Math.min(Math.max(riskScore, 0), 100);
    if (videoUrl !== undefined) interview.videoUrl = videoUrl;

    await interview.save();
    await interview.populate("recruiterId", "name email");
    await interview.populate("candidateId", "name email");

    res.status(200).json({
      success: true,
      message: "Interview marked as complete",
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Start interview (change status to in-progress)
export const startInterview = async (req, res) => {
  try {
    if (rejectCandidateDirectAccess(req, res)) return;

    const { id } = req.params;
    const userId = req.user._id;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    // Check authorization: recruiter or candidate can start
    if (
      interview.recruiterId.toString() !== userId.toString() &&
      interview.candidateId.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to start this interview"
      });
    }

    if (interview.status !== "scheduled") {
      return res.status(400).json({
        success: false,
        message: "Only scheduled interviews can be started"
      });
    }

    interview.status = "in-progress";
    await interview.save();

    await interview.populate("recruiterId", "name email");
    await interview.populate("candidateId", "name email");

    res.status(200).json({
      success: true,
      message: "Interview started",
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default {
  createInterview,
  getInterviewById,
  validateJoinToken,
  getRecruiterInterviews,
  getCandidateInterviews,
  updateInterview,
  cancelInterview,
  completeInterview,
  startInterview
};
