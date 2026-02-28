import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { coursesApi, servicesApi } from '../api/client'
import { useAuth } from '../hooks/useAuth'
import CourseCard from './CourseCard'
import ServiceCard from './ServiceCard'
import MediaSection from './MediaSection'
import ArticlesSection from './ArticlesSection'

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="bg-enterprise-blue-dark text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">E and E Software Solution</h1>
          <nav className="flex items-center gap-3">
            {user?.email ? (
              <>
                <span className="text-enterprise-blue-light/90 text-sm hidden sm:inline">{user.email}</span>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-sm font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg bg-enterprise-blue-accent hover:bg-enterprise-blue-light text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative rounded-2xl overflow-hidden shadow-card-hover mb-10">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=480&fit=crop"
            alt="E and E Software Solution"
            className="w-full h-52 sm:h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-enterprise-blue-dark/95 via-enterprise-blue-dark/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome to E and E Software Solution</h2>
            <p className="text-enterprise-blue-light mt-2 max-w-xl">
              Enterprise software development, training, and consulting. Courses in Java, Spring Boot, React, and cloud — plus custom web apps and API development.
            </p>
          </div>
        </div>

        <ArticlesSection />
        <MediaSection />

        <section className="mb-10">
          <h2 className="section-heading mb-2">Courses</h2>
          <p className="text-slate-600 mb-4 text-sm">Structured training with hands-on projects.</p>
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
          <h2 className="section-heading mb-2">Services</h2>
          <p className="text-slate-600 mb-4 text-sm">Custom development and integration for your business.</p>
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
