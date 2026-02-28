import { useState } from 'react'

const RELATED_TOPICS = {
  'Java': ['Spring Boot', 'REST APIs', 'Database'],
  'Spring Boot': ['Java', 'REST APIs', 'Security'],
  'React': ['Vite', 'Tailwind', 'State Management'],
}

export default function CourseCard({ course, allCourses = [] }) {
  const [expanded, setExpanded] = useState(false)
  const related = allCourses.filter((c) => c.id !== course.id).slice(0, 3)
  const topics = RELATED_TOPICS[course.title] || ['Software', 'Best practices']

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card hover:shadow-card-hover transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-enterprise-blue/10 flex items-center justify-center">
          <span className="text-enterprise-blue font-semibold text-sm">{course.title?.charAt(0) || 'C'}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-enterprise-blue-dark">{course.title}</h4>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{course.description}</p>
          {course.durationHours != null && (
            <p className="text-xs text-slate-500 mt-2 font-medium">{course.durationHours} hours</p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-sm font-medium text-enterprise-blue hover:underline"
      >
        {expanded ? 'Show less' : 'More details'}
      </button>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600 space-y-2">
          <p>{course.description}</p>
          <p><span className="font-medium text-slate-700">Topics:</span> {topics.join(', ')}</p>
          {related.length > 0 && (
            <p>
              <span className="font-medium text-slate-700">Related courses:</span>{' '}
              {related.map((c) => c.title).join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
