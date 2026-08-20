import express from "express";
import interviewController from "../controllers/interviewController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// CREATE interview (recruiter only)
router.post(
  "/",
  authorizeRoles("recruiter"),
  interviewController.createInterview
);

// GET recruiter's interviews
router.get(
  "/recruiter/mine",
  authorizeRoles("recruiter"),
  interviewController.getRecruiterInterviews
);

// GET candidate's interviews
router.get(
  "/candidate/mine",
  authorizeRoles("candidate"),
  interviewController.getCandidateInterviews
);

// Validate the recruiter-generated candidate join link.
router.get(
  "/join/:joinToken",
  authorizeRoles("candidate"),
  interviewController.validateJoinToken
);

// GET interview by ID (both recruiter and candidate)
router.get(
  "/:id",
  interviewController.getInterviewById
);

// UPDATE interview (recruiter only)
router.put(
  "/:id",
  authorizeRoles("recruiter"),
  interviewController.updateInterview
);

// CANCEL interview (both recruiter and candidate)
router.put(
  "/:id/cancel",
  interviewController.cancelInterview
);

// START interview (mark as in-progress)
router.put(
  "/:id/start",
  interviewController.startInterview
);

// COMPLETE interview (recruiter only)
router.put(
  "/:id/complete",
  authorizeRoles("recruiter"),
  interviewController.completeInterview
);

export default router;
