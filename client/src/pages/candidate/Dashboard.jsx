function Dashboard() {
    return (
        <main style={{
            minHeight: "100vh",
            padding: "32px 24px",
            background: "#f8fafc"
        }}>
            <section style={{
                maxWidth: "760px",
                margin: "0 auto",
                padding: "32px",
                borderRadius: "12px",
                background: "#ffffff",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.08)"
            }}>
                <p style={{
                    margin: "0 0 8px",
                    color: "#2563eb",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase"
                }}>
                    Candidate Dashboard
                </p>
                <h1 style={{ margin: "0 0 12px", color: "#111827" }}>Your interview access</h1>
                <p style={{ margin: "0 0 20px", color: "#475569", lineHeight: 1.6 }}>
                    Interviews are available only through the secure link or QR code shared by the recruiter.
                    This dashboard does not list or join interviews directly.
                </p>
                <div style={{
                    padding: "16px",
                    borderRadius: "8px",
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    color: "#1e3a8a"
                }}>
                    Open the recruiter-provided link while signed in to validate your access and enter the waiting room.
                </div>
            </section>
        </main>
    );
}

export default Dashboard;
