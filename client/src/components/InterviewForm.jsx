import { useState } from "react";
import { createInterview } from "../services/interviewService";

function InterviewForm({ onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        candidateEmail: "",
        jobTitle: "",
        startTime: "",
        endTime: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validation
        if (!formData.candidateEmail || !formData.jobTitle || !formData.startTime || !formData.endTime) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        const start = new Date(formData.startTime);
        const end = new Date(formData.endTime);

        if (start >= end) {
            setError("Start time must be before end time");
            setLoading(false);
            return;
        }

        try {
            const response = await createInterview({
                candidateEmail: formData.candidateEmail,
                jobTitle: formData.jobTitle,
                startTime: formData.startTime,
                endTime: formData.endTime
            });

            if (response.success) {
                setFormData({
                    candidateEmail: "",
                    jobTitle: "",
                    startTime: "",
                    endTime: ""
                });
                onSuccess(response.interview);
            } else {
                setError(response.message || "Failed to create interview");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create interview. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            marginBottom: "24px"
        }}>
            <h2 style={{ margin: "0 0 20px 0", color: "#111827" }}>Create New Interview</h2>

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

            <form onSubmit={handleSubmit}>
                <label style={{ display: "block", marginBottom: "14px" }}>
                    <span style={{ display: "block", marginBottom: "6px", color: "#334155", fontWeight: 600 }}>Candidate Email</span>
                    <input
                        type="email"
                        name="candidateEmail"
                        value={formData.candidateEmail}
                        onChange={handleChange}
                        placeholder="candidate@example.com"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            boxSizing: "border-box",
                            outline: "none",
                            opacity: loading ? 0.6 : 1
                        }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: "14px" }}>
                    <span style={{ display: "block", marginBottom: "6px", color: "#334155", fontWeight: 600 }}>Job Title</span>
                    <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="e.g., Senior React Developer"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            boxSizing: "border-box",
                            outline: "none",
                            opacity: loading ? 0.6 : 1
                        }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: "14px" }}>
                    <span style={{ display: "block", marginBottom: "6px", color: "#334155", fontWeight: 600 }}>Start Time</span>
                    <input
                        type="datetime-local"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            boxSizing: "border-box",
                            outline: "none",
                            opacity: loading ? 0.6 : 1
                        }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: "14px" }}>
                    <span style={{ display: "block", marginBottom: "6px", color: "#334155", fontWeight: 600 }}>End Time</span>
                    <input
                        type="datetime-local"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            boxSizing: "border-box",
                            outline: "none",
                            opacity: loading ? 0.6 : 1
                        }}
                    />
                </label>

                <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            flex: 1,
                            padding: "12px",
                            border: "none",
                            borderRadius: "8px",
                            background: loading ? "#ccc" : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            color: "#ffffff",
                            fontWeight: 600,
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "all 0.3s ease"
                        }}
                    >
                        {loading ? "Creating..." : "Create Interview"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        style={{
                            flex: 1,
                            padding: "12px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "8px",
                            background: "#ffffff",
                            color: "#334155",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.3s ease"
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InterviewForm;
