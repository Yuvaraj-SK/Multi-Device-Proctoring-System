import { useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function AuthForm({ onSubmit, loading = false }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (mode === 'register' && form.password !== form.confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    try {
      await onSubmit({ ...form, mode })
      setForm(initialForm)
      setMessage(mode === 'login' ? 'Login successful.' : 'Account created successfully.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div className="auth-card">
      <div className="brand-block">
        <div className="brand-badge">MP</div>
        <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p>
          {mode === 'login'
            ? 'Sign in to continue monitoring proctoring sessions.'
            : 'Join the Multi-Device Proctoring System and start secure supervision.'}
        </p>
      </div>

      <div className="mode-toggle" role="tablist" aria-label="Authentication mode">
        <button
          type="button"
          className={mode === 'register' ? 'active' : ''}
          onClick={() => {
            setMode('register')
            setMessage('')
          }}
        >
          Register
        </button>
        <button
          type="button"
          className={mode === 'login' ? 'active' : ''}
          onClick={() => {
            setMode('login')
            setMessage('')
          }}
        >
          Login
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <label>
            <span>Full name</span>
            <input
              name="name"
              type="text"
              placeholder="Asha Patel"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
        )}

        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Password</span>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        {mode === 'register' && (
          <label>
            <span>Confirm password</span>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
        </button>

        {message && <p className="status-message">{message}</p>}
      </form>
    </div>
  )
}
