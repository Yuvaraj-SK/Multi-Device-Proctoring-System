import { useState, useEffect } from "react";
import { getRecruiterInterviews, startInterview } from "../../services/interviewService";
import InterviewForm from "../../components/InterviewForm";
import InterviewDetails from "../../components/InterviewDetails";

function Dashboard() {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchInterviews = async () => {
        try {
            setLoading(true);
            setError("");
            const status = statusFilter === "all" ? null : statusFilter;
            const response = await getRecruiterInterviews(status);
            if (response.success) {
                setInterviews(response.interviews || []);
            } else {
                setError(response.message || "Failed to fetch interviews");
            }
        } catch {
            setError("Failed to fetch interviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetching remote interview data is intentionally triggered by the selected filter.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchInterviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFilter]);

    const handleInterviewCreated = (newInterview) => {
        setInterviews([...interviews, newInterview]);
        setShowForm(false);
        setSelectedInterview(newInterview);
    };

    const handleInterviewUpdated = (updatedInterview) => {
        setInterviews(interviews.map(i => i._id === updatedInterview._id ? updatedInterview : i));
        setSelectedInterview(updatedInterview);
    };

    const handleStartInterview = async (interviewId) => {
        try {
            const response = await startInterview(interviewId);
            if (response.success) {
                handleInterviewUpdated(response.interview);
            }
        } catch (err) {
            alert("Failed to start interview: " + (err.response?.data?.message || err.message));
        }
    };

    const formatDateTime = (dateString) => {
        const options = { 
            year: "numeric", 
            month: "short", 
            day: "numeric", 
            hour: "2-digit", 
            minute: "2-digit" 
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const getStatusColor = (status) => {
        const colors = {
            scheduled: "#3b82f6",
            "in-progress": "#f59e0b",
            completed: "#10b981",
            cancelled: "#ef4444"
        };
        return colors[status] || "#6b7280";
    };

    const getStatusBgColor = (status) => {
        const colors = {
            scheduled: "#dbeafe",
            "in-progress": "#fef3c7",
            completed: "#d1fae5",
            cancelled: "#fee2e2"
        };
        return colors[status] || "#f3f4f6";
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f8fafc",
            padding: "24px"
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto"
            }}>
                {/* Header */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "32px"
                }}>
                    <div>
                        <h1 style={{ margin: "0 0 8px 0", color: "#111827" }}>Recruiter Dashboard</h1>
                        <p style={{ margin: 0, color: "#64748b" }}>Manage interviews and candidates</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={{
                            padding: "12px 24px",
                            border: "none",
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            color: "#ffffff",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.3s ease"
                        }}
                    >
                        + Create Interview
                    </button>
                </div>

                {/* Form */}
                {showForm && (
                    <InterviewForm
                        onSuccess={handleInterviewCreated}
                        onCancel={() => setShowForm(false)}
                    />
                )}

                {/* Error Message */}
                {error && (
                    <div style={{
                        marginBottom: "20px",
                        padding: "16px",
                        borderRadius: "8px",
                        background: "#fee2e2",
                        border: "1px solid #fca5a5",
                        color: "#991b1b"
                    }}>
                        {error}
                    </div>
                )}

                {/* Filter */}
                <div style={{
                    marginBottom: "24px",
                    display: "flex",
                    gap: "12px"
                }}>
                    <span style={{ alignSelf: "center", color: "#64748b", fontWeight: 600 }}>Filter:</span>
                    {["all", "scheduled", "in-progress", "completed", "cancelled"].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            style={{
                                padding: "8px 16px",
                                border: statusFilter === status ? "2px solid #4f46e5" : "1px solid #cbd5e1",
                                borderRadius: "6px",
                                background: statusFilter === status ? "#eef2ff" : "#ffffff",
                                color: statusFilter === status ? "#4f46e5" : "#64748b",
                                fontWeight: 600,
                                cursor: "pointer",
                                textTransform: "capitalize",
                                transition: "all 0.2s"
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <div style={{
                        textAlign: "center",
                        padding: "48px 24px",
                        color: "#64748b"
                    }}>
                        Loading interviews...
                    </div>
                )}

                {/* Interview List */}
                {!loading && interviews.length === 0 && (
                    <div style={{
                        textAlign: "center",
                        padding: "48px 24px",
                        background: "#ffffff",
                        borderRadius: "12px",
                        color: "#64748b"
                    }}>
                        No interviews found. Create one to get started!
                    </div>
                )}

                {!loading && interviews.length > 0 && (
                    <div style={{
                        display: "grid",
                        gap: "16px"
                    }}>
                        {interviews.map(interview => (
                            <div
                                key={interview._id}
                                onClick={() => setSelectedInterview(interview)}
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "12px",
                                    padding: "20px",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    border: "1px solid #e5e7eb"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.12)"}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)"}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                                    <div>
                                        <h3 style={{ margin: "0 0 4px 0", color: "#111827" }}>{interview.jobTitle}</h3>
                                        <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                                            Candidate: {interview.candidateId?.name}
                                        </p>
                                    </div>
                                    <span style={{
                                        background: getStatusBgColor(interview.status),
                                        color: getStatusColor(interview.status),
                                        padding: "6px 12px",
                                        borderRadius: "20px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        textTransform: "capitalize"
                                    }}>
                                        {interview.status}
                                    </span>
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                                    <div>
                                        <p style={{ margin: "0 0 4px 0", color: "#64748b", fontSize: "12px", fontWeight: 600 }}>Start</p>
                                        <p style={{ margin: 0, color: "#111827" }}>{formatDateTime(interview.startTime)}</p>
                                    </div>
                                    <div>
                                        <p style={{ margin: "0 0 4px 0", color: "#64748b", fontSize: "12px", fontWeight: 600 }}>Duration</p>
                                        <p style={{ margin: 0, color: "#111827" }}>{interview.duration} minutes</p>
                                    </div>
                                </div>

                                {interview.riskScore !== null && (
                                    <div style={{ marginBottom: "12px", paddingBottom: "12px", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
                                        <p style={{ margin: "0 0 4px 0", color: "#64748b", fontSize: "12px", fontWeight: 600 }}>Risk Score</p>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <div style={{
                                                width: "100%",
                                                height: "8px",
                                                background: "#e5e7eb",
                                                borderRadius: "4px",
                                                overflow: "hidden"
                                            }}>
                                                <div style={{
                                                    width: `${interview.riskScore}%`,
                                                    height: "100%",
                                                    background: interview.riskScore > 70 ? "#ef4444" : interview.riskScore > 40 ? "#f59e0b" : "#10b981",
                                                    transition: "width 0.3s"
                                                }} />
                                            </div>
                                            <span style={{ fontWeight: 600, minWidth: "35px" }}>{interview.riskScore}</span>
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: "flex", gap: "12px" }}>
                                    {interview.status === "scheduled" && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleStartInterview(interview._id);
                                            }}
                                            style={{
                                                flex: 1,
                                                padding: "8px 12px",
                                                border: "none",
                                                borderRadius: "6px",
                                                background: "#f59e0b",
                                                color: "#ffffff",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                fontSize: "12px"
                                            }}
                                        >
                                            Start Interview
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedInterview(interview);
                                        }}
                                        style={{
                                            flex: 1,
                                            padding: "8px 12px",
                                            border: "1px solid #cbd5e1",
                                            borderRadius: "6px",
                                            background: "#ffffff",
                                            color: "#4f46e5",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            fontSize: "12px"
                                        }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Interview Details Modal */}
                {selectedInterview && (
                    <InterviewDetails
                        interview={selectedInterview}
                        userRole="recruiter"
                        onClose={() => setSelectedInterview(null)}
                        onUpdated={handleInterviewUpdated}
                    />
                )}
            </div>
        </div>
    );
}

export default Dashboard;