import { useState } from 'react'

export default function ServiceCard({ service, allServices = [] }) {
  const [expanded, setExpanded] = useState(false)
  const related = allServices.filter((s) => s.id !== service.id).slice(0, 2)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card hover:shadow-card-hover transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-enterprise-blue/10 flex items-center justify-center">
          <span className="text-enterprise-blue font-semibold text-sm">{service.name?.charAt(0) || 'S'}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-enterprise-blue-dark">{service.name}</h4>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{service.description}</p>
          {service.price != null && (
            <p className="text-sm font-semibold text-enterprise-blue mt-2">From ${service.price}</p>
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
