import express from "express";
import { getProfile } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Protected profile
router.get("/profile", protect, getProfile);

// Recruiter-only test route
router.get(
    "/recruiter-test",
    protect,
    authorizeRoles("recruiter"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Recruiter access granted"
        });
    }
);

export default router;