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
    <div className="p-4 rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-medium text-enterprise-blue">{course.title}</h4>
      <p className="text-sm text-slate-600 mt-1 line-clamp-2">{course.description}</p>
      {course.durationHours != null && (
        <p className="text-xs text-slate-500 mt-2">{course.durationHours} hours</p>
      )}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-sm text-enterprise-blue hover:underline"
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
