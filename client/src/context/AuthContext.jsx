import { createContext, useMemo, useState } from 'react'
import { clearStoredUser, getStoredUser, persistUser } from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())

  const login = async (credentials) => {
    const loggedInUser = await import('../services/authService').then((module) => module.login(credentials))
    setUser(loggedInUser)
    persistUser(loggedInUser)
    return loggedInUser
  }

  const register = async (payload) => {
    const newUser = await import('../services/authService').then((module) => module.register(payload))
    setUser(newUser)
    persistUser(newUser)
    return newUser
  }

  const logout = () => {
    clearStoredUser()
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
