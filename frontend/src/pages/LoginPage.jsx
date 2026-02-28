import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoginRegister from '../components/LoginRegister'

export default function LoginPage() {
  const { token } = useAuth()
  const location = useLocation()

  if (token) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-enterprise-blue">E and E Software Solution</h1>
        <p className="text-slate-600 mt-2">Sign in or create an account</p>
      </div>
      <LoginRegister />
    </div>
  )
}
