function Register() {
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

                <form>
                    <label style={{ display: 'block', marginBottom: '14px' }}>
                        <span style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600 }}>Name</span>
                        <input
                            type="text"
                            placeholder="Enter your name"
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
                            placeholder="Create a password"
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
                        <span style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600 }}>Confirm Password</span>
                        <input
                            type="password"
                            placeholder="Confirm your password"
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

                    <div style={{ marginBottom: '18px' }}>
                        <span style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: 600 }}>Role</span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                                <input type="radio" name="role" />
                                Recruiter
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                                <input type="radio" name="role" />
                                Candidate
                            </label>
                        </div>
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
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;