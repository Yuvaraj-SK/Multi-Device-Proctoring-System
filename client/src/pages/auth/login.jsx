function Login() {
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
                maxWidth: '400px',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 12px 35px rgba(15, 23, 42, 0.12)',
                padding: '32px'
            }}>
                <h2 style={{ margin: '0 0 8px', textAlign: 'center', color: '#111827' }}>Welcome Back</h2>
                <p style={{ margin: '0 0 24px', textAlign: 'center', color: '#64748b' }}>Sign in to your account</p>

                <form>
                    <label style={{ display: 'block', marginBottom: '14px' }}>
                        <span style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600 }}>Email</span>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </label>

                    <label style={{ display: 'block', marginBottom: '14px' }}>
                        <span style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600 }}>Password</span>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </label>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '14px' }}>
                            <input type="checkbox" />
                            Remember Me
                        </label>
                        <a href="#" style={{ color: '#4f46e5', textDecoration: 'none', fontSize: '14px' }}>Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: 'none',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                            color: '#ffffff',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        Login
                    </button>
                </form>

                <p style={{ marginTop: '18px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                    Don’t have an account? <a href="/register" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>Register</a>
                </p>
            </div>
        </div>
    );
}

export default Login;