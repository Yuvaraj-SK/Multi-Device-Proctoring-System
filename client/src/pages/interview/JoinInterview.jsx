import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { validateJoinInterview } from "../../services/interviewService";

function JoinInterview() {
    const { joinToken } = useParams();
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [waitingRoom, setWaitingRoom] = useState(false);

    useEffect(() => {
        let active = true;

        const validateLink = async () => {
            try {
                const response = await validateJoinInterview(joinToken);
                if (!active) return;

                if (response.success) {
                    setInterview(response.interview);
                } else {
                    setError(response.message || "Invalid or expired interview link");
                }
            } catch (requestError) {
                if (!active) return;
                setError(
                    requestError.response?.data?.message ||
                    "Invalid or expired interview link"
                );
            } finally {
                if (active) setLoading(false);
            }
        };

        validateLink();

        return () => {
            active = false;
        };
    }, [joinToken]);

    if (loading) {
        return <StatusPanel message="Validating interview link..." />;
    }

    if (error || !interview) {
        return (
            <StatusPanel
                title="Invalid or Expired Interview Link"
                message={error || "This interview link is no longer available."}
                isError
            />
        );
    }

    if (waitingRoom) {
        return (
            <main style={pageStyle}>
                <section style={panelStyle}>
                    <p style={eyebrowStyle}>Secure interview access</p>
                    <h1 style={headingStyle}>Waiting Room</h1>
                    <p style={bodyStyle}>
                        You are authorized to join <strong>{interview.jobTitle}</strong>.
                        Keep this page open while the recruiter prepares the interview.
                    </p>
                    <div style={infoBoxStyle}>
                        <strong>Scheduled time</strong>
                        <span>{new Date(interview.startTime).toLocaleString()}</span>
                    </div>
                    <p style={mutedStyle}>Device permissions and the interview room will appear here when enabled.</p>
                </section>
            </main>
        );
    }

    return (
        <main style={pageStyle}>
            <section style={panelStyle}>
                <p style={eyebrowStyle}>Secure interview access</p>
                <h1 style={headingStyle}>Ready to join?</h1>
                <p style={bodyStyle}>
                    Your secure link is valid for <strong>{interview.jobTitle}</strong>.
                </p>
                <div style={infoBoxStyle}>
                    <strong>Scheduled time</strong>
                    <span>{new Date(interview.startTime).toLocaleString()}</span>
                    <strong>Duration</strong>
                    <span>{interview.duration} minutes</span>
                </div>
                <button type="button" onClick={() => setWaitingRoom(true)} style={primaryButtonStyle}>
                    Enter Waiting Room
                </button>
            </section>
        </main>
    );
}

function StatusPanel({ title = "Please wait", message, isError = false }) {
    return (
        <main style={pageStyle}>
            <section style={panelStyle}>
                <p style={eyebrowStyle}>Secure interview access</p>
                <h1 style={headingStyle}>{title}</h1>
                <p style={isError ? errorStyle : bodyStyle}>{message}</p>
            </section>
        </main>
    );
}

const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "linear-gradient(135deg, #eff6ff, #f8fafc)"
};

const panelStyle = {
    width: "100%",
    maxWidth: "560px",
    padding: "32px",
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)"
};

const eyebrowStyle = {
    margin: "0 0 8px",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase"
};

const headingStyle = {
    margin: "0 0 12px",
    color: "#111827"
};

const bodyStyle = {
    margin: "0 0 20px",
    color: "#475569",
    lineHeight: 1.6
};

const mutedStyle = {
    margin: "16px 0 0",
    color: "#64748b",
    fontSize: "14px"
};

const errorStyle = {
    margin: 0,
    color: "#991b1b",
    lineHeight: 1.6
};

const infoBoxStyle = {
    display: "grid",
    gap: "8px",
    marginBottom: "20px",
    padding: "16px",
    borderRadius: "8px",
    background: "#eff6ff",
    color: "#1e3a8a"
};

const primaryButtonStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer"
};

export default JoinInterview;
