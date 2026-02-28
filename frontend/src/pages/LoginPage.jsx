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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-enterprise-blue-dark/5 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-enterprise-blue-dark tracking-tight">E and E Software Solution</h1>
        <p className="text-slate-600 mt-2">Sign in or create an account</p>
      </div>
      <div className="w-full max-w-md">
        <LoginRegister />
      </div>
    </div>
  )
}
