import { useEffect, useState } from "react";
import { cancelInterview, completeInterview } from "../services/interviewService";
import QRCode from "qrcode";

function InterviewDetails({ interview, userRole, onClose, onUpdated }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [notes, setNotes] = useState(interview.notes || "");
    const [riskScore, setRiskScore] = useState(interview.riskScore || "");
    const [isEditing, setIsEditing] = useState(false);
    const [qrCode, setQrCode] = useState("");

    const joinUrl = interview.joinToken
        ? `${window.location.origin}/join/${encodeURIComponent(interview.joinToken)}`
        : "";

    useEffect(() => {
        let cancelled = false;

        if (userRole === "recruiter" && joinUrl) {
            QRCode.toDataURL(joinUrl, { width: 220, margin: 1 })
                .then((dataUrl) => {
                    if (!cancelled) setQrCode(dataUrl);
                })
                .catch(() => {
                    if (!cancelled) setQrCode("");
                });
        }

        return () => {
            cancelled = true;
        };
    }, [joinUrl, userRole]);

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

    const handleCancel = async () => {
        if (!window.confirm("Are you sure you want to cancel this interview?")) return;

        setError("");
        setLoading(true);

        try {
            const response = await cancelInterview(interview._id);
            if (response.success) {
                onUpdated(response.interview);
            } else {
                setError(response.message || "Failed to cancel interview");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to cancel interview");
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        if (!window.confirm("Mark this interview as complete?")) return;

        setError("");
        setLoading(true);

        try {
            const response = await completeInterview(interview._id, {
                notes,
                riskScore: riskScore ? parseInt(riskScore) : undefined
            });

            if (response.success) {
                onUpdated(response.interview);
                setIsEditing(false);
            } else {
                setError(response.message || "Failed to complete interview");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to complete interview");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
        }}>
            <div style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "28px",
                maxWidth: "600px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 20px 25px rgba(0, 0, 0, 0.2)"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h2 style={{ margin: 0, color: "#111827" }}>Interview Details</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "24px",
                            cursor: "pointer",
                            color: "#6b7280"
                        }}
                    >
                        ✕
                    </button>
                </div>

                {error && (
                    <div style={{
                        marginBottom: "16px",
                        padding: "12px",
                        borderRadius: "8px",
                        background: "#fee2e2",
                        border: "1px solid #fca5a5",
                        color: "#991b1b",
                        fontSize: "14px"
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                        <span style={{ color: "#64748b", fontSize: "14px" }}>Status</span>
                        <span style={{
                            background: getStatusColor(interview.status),
                            color: "#ffffff",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "capitalize"
                        }}>
                            {interview.status}
                        </span>
                    </div>

                    <DetailRow label="Interview ID" value={interview.interviewId} />
                    <DetailRow label="Job Title" value={interview.jobTitle} />
                    <DetailRow label="Recruiter" value={interview.recruiterId?.name || "N/A"} />
                    <DetailRow label="Candidate" value={interview.candidateId?.name || "N/A"} />
                    <DetailRow label="Start Time" value={formatDateTime(interview.startTime)} />
                    <DetailRow label="End Time" value={formatDateTime(interview.endTime)} />
                    <DetailRow label="Duration" value={`${interview.duration} minutes`} />
                </div>

                {userRole === "recruiter" && joinUrl && (
                    <div style={{
                        marginBottom: "20px",
                        padding: "16px",
                        borderRadius: "8px",
                        background: "#eff6ff",
                        border: "1px solid #bfdbfe"
                    }}>
                        <h3 style={{ margin: "0 0 8px 0", color: "#1e3a8a", fontSize: "16px" }}>Candidate Join Link</h3>
                        <p style={{ margin: "0 0 10px 0", color: "#1e40af", fontSize: "13px" }}>
                            Share this link or QR code with the assigned candidate.
                        </p>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "14px" }}>
                            <input
                                readOnly
                                value={joinUrl}
                                aria-label="Candidate join link"
                                style={{
                                    flex: 1,
                                    minWidth: 0,
                                    padding: "10px",
                                    border: "1px solid #93c5fd",
                                    borderRadius: "6px",
                                    background: "#ffffff",
                                    color: "#1e3a8a"
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => navigator.clipboard.writeText(joinUrl)}
                                style={{
                                    padding: "10px 12px",
                                    border: "none",
                                    borderRadius: "6px",
                                    background: "#2563eb",
                                    color: "#ffffff",
                                    fontWeight: 600,
                                    cursor: "pointer"
                                }}
                            >
                                Copy Link
                            </button>
                        </div>
                        {qrCode && (
                            <img src={qrCode} alt="QR code for candidate interview join link" width="220" height="220" />
                        )}
                    </div>
                )}

                {userRole === "recruiter" && (interview.status === "completed" || interview.status === "in-progress") && (
                    <div style={{ marginBottom: "20px" }}>
                        <h3 style={{ margin: "0 0 12px 0", color: "#334155", fontSize: "16px", fontWeight: 600 }}>Recruiter Notes</h3>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            disabled={!isEditing || loading}
                            placeholder="Add notes about the interview..."
                            style={{
                                width: "100%",
                                minHeight: "100px",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                                fontFamily: "Arial, sans-serif",
                                outline: "none",
                                boxSizing: "border-box",
                                opacity: isEditing ? 1 : 0.6,
                                resize: "vertical"
                            }}
                        />
                    </div>
                )}

                {userRole === "recruiter" && interview.status === "completed" && (
                    <div style={{ marginBottom: "20px" }}>
                        <h3 style={{ margin: "0 0 12px 0", color: "#334155", fontSize: "16px", fontWeight: 600 }}>Risk Score (0-100)</h3>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={riskScore}
                            onChange={(e) => setRiskScore(e.target.value)}
                            disabled={!isEditing || loading}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                                outline: "none",
                                boxSizing: "border-box",
                                opacity: isEditing ? 1 : 0.6
                            }}
                        />
                        {interview.riskScore !== null && (
                            <p style={{ margin: "8px 0 0 0", color: "#64748b", fontSize: "14px" }}>
                                Current score: {interview.riskScore}
                            </p>
                        )}
                    </div>
                )}

                <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                    {interview.status === "scheduled" && (
                        <>
                            {userRole === "recruiter" && (
                                <button
                                    onClick={handleCancel}
                                    disabled={loading}
                                    style={{
                                        flex: 1,
                                        padding: "12px",
                                        border: "1px solid #fca5a5",
                                        borderRadius: "8px",
                                        background: "#fee2e2",
                                        color: "#991b1b",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        opacity: loading ? 0.6 : 1
                                    }}
                                >
                                    Cancel Interview
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                style={{
                                    flex: 1,
                                    padding: "12px",
                                    border: "none",
                                    borderRadius: "8px",
                                    background: "#e5e7eb",
                                    color: "#374151",
                                    fontWeight: 600,
                                    cursor: "pointer"
                                }}
                            >
                                Close
                            </button>
                        </>
                    )}

                    {interview.status === "in-progress" && userRole === "recruiter" && (
                        <>
                            {!isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        style={{
                                            flex: 1,
                                            padding: "12px",
                                            border: "none",
                                            borderRadius: "8px",
                                            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                            color: "#ffffff",
                                            fontWeight: 600,
                                            cursor: "pointer"
                                        }}
                                    >
                                        Complete & Review
                                    </button>
                                    <button
                                        onClick={onClose}
                                        style={{
                                            flex: 1,
                                            padding: "12px",
                                            border: "none",
                                            borderRadius: "8px",
                                            background: "#e5e7eb",
                                            color: "#374151",
                                            fontWeight: 600,
                                            cursor: "pointer"
                                        }}
                                    >
                                        Close
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleComplete}
                                        disabled={loading}
                                        style={{
                                            flex: 1,
                                            padding: "12px",
                                            border: "none",
                                            borderRadius: "8px",
                                            background: loading ? "#ccc" : "#10b981",
                                            color: "#ffffff",
                                            fontWeight: 600,
                                            cursor: loading ? "not-allowed" : "pointer"
                                        }}
                                    >
                                        {loading ? "Saving..." : "Save & Complete"}
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        disabled={loading}
                                        style={{
                                            flex: 1,
                                            padding: "12px",
                                            border: "none",
                                            borderRadius: "8px",
                                            background: "#e5e7eb",
                                            color: "#374151",
                                            fontWeight: 600,
                                            cursor: "pointer"
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </>
                    )}

                    {interview.status === "completed" && (
                        <button
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: "12px",
                                border: "none",
                                borderRadius: "8px",
                                background: "#e5e7eb",
                                color: "#374151",
                                fontWeight: 600,
                                cursor: "pointer"
                            }}
                        >
                            Close
                        </button>
                    )}

                    {interview.status === "cancelled" && (
                        <button
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: "12px",
                                border: "none",
                                borderRadius: "8px",
                                background: "#e5e7eb",
                                color: "#374151",
                                fontWeight: 600,
                                cursor: "pointer"
                            }}
                        >
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #e5e7eb" }}>
            <span style={{ color: "#64748b", fontSize: "14px" }}>{label}</span>
            <span style={{ color: "#111827", fontWeight: 600 }}>{value}</span>
        </div>
    );
}

export default InterviewDetails;
