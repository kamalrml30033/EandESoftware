import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/client'
import { useAuth } from '../hooks/useAuth'

export default function LoginRegister({ defaultTab = 'login' }) {
  const [tab, setTab] = useState(defaultTab)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [admin, setAdmin] = useState(false)
  const { login } = useAuth()

  const loginMutation = useMutation({
    mutationFn: () => authApi.login(email, password),
    onSuccess: (data) => login(data.token, { email: data.email, id: data.id, roles: data.roles }),
    onError: (err) => alert(err.body?.message || err.message || 'Login failed'),
  })

  const registerMutation = useMutation({
    mutationFn: () => authApi.register({ email, password, fullName, admin }),
    onSuccess: (data) => login(data.token, { email: data.email, id: data.id, roles: data.roles }),
    onError: (err) => alert(err.body?.message || err.message || 'Registration failed'),
  })

  const handleLogin = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  const handleRegister = (e) => {
    e.preventDefault()
    registerMutation.mutate()
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex rounded-t-lg overflow-hidden border-b border-enterprise-blue/20">
        <button
          type="button"
          onClick={() => setTab('login')}
          className={`flex-1 py-3 px-4 font-medium ${
            tab === 'login'
              ? 'bg-enterprise-blue text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setTab('register')}
          className={`flex-1 py-3 px-4 font-medium ${
            tab === 'register'
              ? 'bg-enterprise-blue text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Register
        </button>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg border border-t-0 border-enterprise-blue/20 p-6">
        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-2.5 rounded-lg bg-enterprise-blue text-white font-medium hover:bg-enterprise-blue-light disabled:opacity-50"
            >
              {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password (min 6)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue focus:border-transparent"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={admin}
                onChange={(e) => setAdmin(e.target.checked)}
                className="rounded border-slate-300 text-enterprise-blue focus:ring-enterprise-blue"
              />
              Register as Admin
            </label>
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full py-2.5 rounded-lg bg-enterprise-blue text-white font-medium hover:bg-enterprise-blue-light disabled:opacity-50"
            >
              {registerMutation.isPending ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
