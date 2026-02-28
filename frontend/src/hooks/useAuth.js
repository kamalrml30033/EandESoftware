import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

function getStored() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    const user = JSON.parse(localStorage.getItem(USER_KEY) || 'null')
    return { token, user }
  } catch {
    return { token: null, user: null }
  }
}

export function useAuth() {
  const [state, setState] = useState(getStored)
  const navigate = useNavigate()

  const login = useCallback(
    (token, user) => {
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(USER_KEY, JSON.stringify(user || {}))
      setState({ token, user: user || {} })
      navigate('/', { replace: true })
    },
    [navigate]
  )

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setState({ token: null, user: null })
    navigate('/login', { replace: true })
  }, [navigate])

  const isAdmin = state.user?.roles?.includes('ADMIN') ?? false

  return {
    token: state.token,
    user: state.user,
    login,
    logout,
    isAdmin,
    isAuthenticated: !!state.token,
  }
}
