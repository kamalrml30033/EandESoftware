import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { adminServicesApi } from '../api/client'
import { useAuth } from '../hooks/useAuth'

export default function AdminPanel() {
  const { logout } = useAuth()
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', description: '', price: '', active: true })

  const { data: servicesData, isLoading } = useQuery({
    queryKey: ['admin', 'services'],
    queryFn: adminServicesApi.list,
  })
  const services = Array.isArray(servicesData) ? servicesData : []

  const createMutation = useMutation({
    mutationFn: adminServicesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'services'] })
      queryClient.invalidateQueries({ queryKey: ['services'] })
      setForm({ name: '', description: '', price: '', active: true })
    },
    onError: (e) => alert(e.body?.message || e.message || 'Failed to create'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => adminServicesApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'services'] })
      queryClient.invalidateQueries({ queryKey: ['services'] })
      setEditing(null)
      setForm({ name: '', description: '', price: '', active: true })
    },
    onError: (e) => alert(e.body?.message || e.message || 'Failed to update'),
  })

  const deleteMutation = useMutation({
    mutationFn: adminServicesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'services'] })
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
    onError: (e) => alert(e.body?.message || e.message || 'Failed to delete'),
  })

  const startEdit = (s) => {
    setEditing(s.id)
    setForm({
      name: s.name,
      description: s.description ?? '',
      price: s.price ?? '',
      active: s.active ?? true,
    })
  }

  const submitForm = (e) => {
    e.preventDefault()
    const body = {
      name: form.name,
      description: form.description || null,
      price: form.price === '' ? null : Number(form.price),
      active: form.active,
    }
    if (editing) {
      updateMutation.mutate({ id: editing, body })
    } else {
      createMutation.mutate(body)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="bg-enterprise-blue text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">E and E Software Solution – Admin</h1>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="px-3 py-1.5 rounded bg-enterprise-blue-light hover:bg-enterprise-blue-dark text-sm"
            >
              Dashboard
            </Link>
            <button
              type="button"
              onClick={logout}
              className="px-3 py-1.5 rounded bg-enterprise-blue-light hover:bg-enterprise-blue-dark text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-enterprise-blue-dark mb-6">
          Manage Services
        </h2>

        <form onSubmit={submitForm} className="mb-8 p-4 rounded-lg border border-slate-200 bg-white shadow-sm">
          <h3 className="font-medium text-slate-700 mb-3">
            {editing ? 'Edit service' : 'Add new service'}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-sm text-slate-600 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue"
            />
          </div>
          <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              className="rounded border-slate-300 text-enterprise-blue focus:ring-enterprise-blue"
            />
            Active
          </label>
          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="px-4 py-2 rounded-lg bg-enterprise-blue text-white hover:bg-enterprise-blue-light disabled:opacity-50"
            >
              {editing ? 'Update' : 'Add'}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null)
                  setForm({ name: '', description: '', price: '', active: true })
                }}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {isLoading ? (
          <p className="text-slate-500">Loading services...</p>
        ) : (
          <ul className="space-y-3">
            {services.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white shadow-sm"
              >
                <div>
                  <span className="font-medium text-enterprise-blue">{s.name}</span>
                  {s.price != null && (
                    <span className="ml-2 text-slate-600">${s.price}</span>
                  )}
                  {!s.active && (
                    <span className="ml-2 text-xs text-amber-600">(inactive)</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(s)}
                    className="px-3 py-1 rounded bg-enterprise-blue/10 text-enterprise-blue text-sm hover:bg-enterprise-blue/20"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteMutation.mutate(s.id)}
                    disabled={deleteMutation.isPending}
                    className="px-3 py-1 rounded bg-red-50 text-red-600 text-sm hover:bg-red-100 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
