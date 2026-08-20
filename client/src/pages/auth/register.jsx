import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "../../services/authservice";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "candidate"
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
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            const response = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });
            
            if (response.success) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                
                if (response.user.role === "recruiter") {
                    navigate("/recruiter/dashboard");
                } else if (response.user.role === "candidate") {
                    navigate("/candidate/dashboard");
                }
            } else {
                setError(response.message || "Registration failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
            fontFamily: 'Arial, sans-serif',
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '440px',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 12px 35px rgba(15, 23, 42, 0.12)',
                padding: '32px'
            }}>
                <h2 style={{ margin: '0 0 8px', textAlign: 'center', color: '#111827' }}>Create Account</h2>
                <p style={{ margin: '0 0 24px', textAlign: 'center', color: '#64748b' }}>Join the platform</p>

                {error && (
                    <div style={{
                        marginBottom: '16px',
                        padding: '12px',
                        borderRadius: '8px',
                        background: '#fee2e2',
                        border: '1px solid #fca5a5',
                        color: '#991b1b',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'block', marginBottom: '14px' }}>
                        <span style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600 }}>Name</span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                outline: 'none',
                                boxSizing: 'border-box',
                                opacity: loading ? 0.6 : 1
                            }}
                        />
                    </label>

                    <label style={{ display: 'block', marginBottom: '14px' }}>
                        <span style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600 }}>Email</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                outline: 'none',
                                boxSizing: 'border-box',
                                opacity: loading ? 0.6 : 1
                            }}
                        />
                    </label>

                    <label style={{ display: 'block', marginBottom: '14px' }}>
                        <span style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600 }}>Password</span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password (min 6 characters)"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                outline: 'none',
                                boxSizing: 'border-box',
                                opacity: loading ? 0.6 : 1
                            }}
                        />
                    </label>

                    <label style={{ display: 'block', marginBottom: '14px' }}>
                        <span style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600 }}>Confirm Password</span>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                outline: 'none',
                                boxSizing: 'border-box',
                                opacity: loading ? 0.6 : 1
                            }}
                        />
                    </label>

                    <div style={{ marginBottom: '18px' }}>
                        <span style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: 600 }}>Role</span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={formData.role === "recruiter"}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                Recruiter
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="candidate"
                                    checked={formData.role === "candidate"}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                Candidate
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: 'none',
                            borderRadius: '10px',
                            background: loading ? '#ccc' : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                            color: '#ffffff',
                            fontWeight: 700,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <p style={{ marginTop: '18px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                    Already have an account? <a href="/login" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>Login</a>
                </p>
            </div>
        </div>
    );
}

export default Register;