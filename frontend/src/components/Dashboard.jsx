import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { coursesApi, servicesApi } from '../api/client'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { user, logout, isAdmin } = useAuth()
  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: coursesApi.list,
  })
  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: servicesApi.list,
  })

  return (
    <div className="min-h-screen">
      <header className="bg-enterprise-blue text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">E and E Software Solution</h1>
          <div className="flex items-center gap-4">
            <span className="text-enterprise-blue-light text-sm">{user?.email}</span>
            {isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-1.5 rounded bg-enterprise-blue-light hover:bg-enterprise-blue-dark text-sm"
              >
                Admin
              </Link>
            )}
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

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-enterprise-blue-dark mb-6">Dashboard</h2>

        <section className="mb-10">
          <h3 className="text-lg font-medium text-slate-700 mb-3">Courses</h3>
          {coursesLoading ? (
            <p className="text-slate-500">Loading courses...</p>
          ) : courses.length === 0 ? (
            <p className="text-slate-500">No courses available.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-enterprise-blue">{c.title}</h4>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{c.description}</p>
                  {c.durationHours != null && (
                    <p className="text-xs text-slate-500 mt-2">{c.durationHours} hours</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h3 className="text-lg font-medium text-slate-700 mb-3">Services</h3>
          {servicesLoading ? (
            <p className="text-slate-500">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-slate-500">No services available.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-enterprise-blue">{s.name}</h4>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{s.description}</p>
                  {s.price != null && (
                    <p className="text-sm font-medium text-enterprise-blue mt-2">${s.price}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
