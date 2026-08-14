import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import RecruiterDashboard from "../pages/recruiter/Dashboard";
import CandidateDashboard from "../pages/candidate/Dashboard";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        </Routes>
    );
}

export default AppRoutes;