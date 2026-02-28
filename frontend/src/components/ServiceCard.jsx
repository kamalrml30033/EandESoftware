import { useState } from 'react'

export default function ServiceCard({ service, allServices = [] }) {
  const [expanded, setExpanded] = useState(false)
  const related = allServices.filter((s) => s.id !== service.id).slice(0, 2)

  return (
    <div className="p-4 rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-medium text-enterprise-blue">{service.name}</h4>
      <p className="text-sm text-slate-600 mt-1 line-clamp-2">{service.description}</p>
      {service.price != null && (
        <p className="text-sm font-medium text-enterprise-blue mt-2">From ${service.price}</p>
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
          <p>{service.description}</p>
          {related.length > 0 && (
            <p>
              <span className="font-medium text-slate-700">Related services:</span>{' '}
              {related.map((s) => s.name).join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
