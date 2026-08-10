import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        // 1. Get Authorization header
        const authHeader = req.headers.authorization;

        // 2. Check if token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token"
            });
        }

        // 3. Extract token
        const token = authHeader.split(" ")[1];

        // 4. Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // 5. Find user in database
        const user = await User.findById(decoded.id)
            .select("-password");

        // 6. Check user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // 7. Attach user to request
        req.user = user;

        // 8. Continue to next middleware/controller
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, invalid or expired token"
        });
    }
};

export default protect;