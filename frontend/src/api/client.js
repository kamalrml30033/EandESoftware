// Use env at build time; fallback for production when Vercel build had no env
const API_BASE =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location?.host?.includes('vercel.app')
    ? 'https://e-and-e-backend.onrender.com'
    : '')

function getToken() {
  return localStorage.getItem('token')
}

export async function api(method, path, body) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
    },
  }
  if (body) opts.body = JSON.stringify(body)
  const res = await fetch(`${API_BASE}${path}`, opts)
  if (!res.ok) {
    const err = new Error(res.statusText)
    err.status = res.status
    err.body = await res.json().catch(() => ({}))
    throw err
  }
  return res.json().catch(() => ({}))
}

export const authApi = {
  login: (email, password) => api('POST', '/api/auth/login', { email, password }),
  register: (data) => api('POST', '/api/auth/register', data),
}

function asArray(res) {
  return Array.isArray(res) ? res : []
}

export const coursesApi = {
  list: () => api('GET', '/api/courses').then(asArray),
}

export const servicesApi = {
  list: () => api('GET', '/api/services').then(asArray),
  getById: (id) => api('GET', `/api/services/${id}`),
}

export const adminServicesApi = {
  list: () => api('GET', '/api/admin/services'),
  create: (body) => api('POST', '/api/admin/services', body),
  update: (id, body) => api('PUT', `/api/admin/services/${id}`, body),
  delete: (id) => api('DELETE', `/api/admin/services/${id}`),
}

export const aiChatApi = {
  chat: (query, token) =>
    fetch(`${API_BASE}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ query }),
    }).then((r) => {
      if (!r.ok) throw new Error('AI chat failed')
      return r.json()
    }),
}
