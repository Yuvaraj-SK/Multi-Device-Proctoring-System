import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import RecruiterDashboard from "../pages/recruiter/Dashboard";
import CandidateDashboard from "../pages/candidate/Dashboard";
import JoinInterview from "../pages/interview/JoinInterview";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/join/:joinToken"
                element={
                    <ProtectedRoute>
                        <JoinInterview />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/recruiter/dashboard"
                element={
                    <ProtectedRoute>
                        <RecruiterDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/candidate/dashboard"
                element={
                    <ProtectedRoute>
                        <CandidateDashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default AppRoutes;