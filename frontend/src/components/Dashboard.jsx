import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { coursesApi, servicesApi } from '../api/client'
import { useAuth } from '../hooks/useAuth'
import CourseCard from './CourseCard'
import ServiceCard from './ServiceCard'
import MediaSection from './MediaSection'

export default function Dashboard() {
  const { user, logout, isAdmin } = useAuth()
  const { data: coursesData, isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: coursesApi.list,
  })
  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: servicesApi.list,
  })
  const courses = Array.isArray(coursesData) ? coursesData : []
  const services = Array.isArray(servicesData) ? servicesData : []

  return (
    <div className="min-h-screen">
      <header className="bg-enterprise-blue text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">E and E Software Solution</h1>
          <div className="flex items-center gap-4">
            {user?.email ? (
              <>
                <span className="text-enterprise-blue-light text-sm">{user.email}</span>
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
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1.5 rounded bg-enterprise-blue-light hover:bg-enterprise-blue-dark text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-xl overflow-hidden shadow-lg mb-8 bg-enterprise-blue-dark">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=400&fit=crop"
            alt="E and E Software Solution"
            className="w-full h-48 sm:h-64 object-cover opacity-90"
          />
          <div className="p-4 sm:p-6 text-white">
            <h2 className="text-2xl font-semibold">Welcome to E and E Software Solution</h2>
            <p className="text-enterprise-blue-light mt-1">Enterprise software development, training, and consulting.</p>
          </div>
        </div>

        <MediaSection />

        <section className="mb-10">
          <h3 className="text-lg font-medium text-slate-700 mb-3">Courses</h3>
          {coursesLoading ? (
            <p className="text-slate-500">Loading courses...</p>
          ) : courses.length === 0 ? (
            <p className="text-slate-500">No courses available.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <CourseCard key={c.id} course={c} allCourses={courses} />
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
                <ServiceCard key={s.id} service={s} allServices={services} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
