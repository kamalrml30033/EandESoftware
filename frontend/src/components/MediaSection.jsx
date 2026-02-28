import { useState } from 'react'

const VIDEOS = [
  {
    id: 1,
    title: 'Java Programming – Full Course',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ',
    description: 'Learn Java from scratch: syntax, OOP, and core APIs.',
    thumb: 'https://img.youtube.com/vi/8MmMm2-kJV8/mqdefault.jpg',
  },
  {
    id: 2,
    title: 'Spring Boot – Crash Course',
    embedUrl: 'https://www.youtube.com/embed/9SGDpanrc8U',
    description: 'Build REST APIs and secure backends with Spring Boot.',
    thumb: 'https://img.youtube.com/vi/9SGDpanrc8U/mqdefault.jpg',
  },
  {
    id: 3,
    title: 'React – Full Course for Beginners',
    embedUrl: 'https://www.youtube.com/embed/SqcY0GlETpg',
    description: 'Components, hooks, and modern React patterns.',
    thumb: 'https://img.youtube.com/vi/SqcY0GlETpg/mqdefault.jpg',
  },
  {
    id: 4,
    title: 'REST API Design',
    embedUrl: 'https://www.youtube.com/embed/QpQxW_s4gMc',
    description: 'Best practices for designing and documenting REST APIs.',
    thumb: 'https://img.youtube.com/vi/QpQxW_s4gMc/mqdefault.jpg',
  },
]

const IMAGES = [
  { id: 1, title: 'Our workspace', src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', alt: 'Modern office' },
  { id: 2, title: 'Team collaboration', src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop', alt: 'Team working together' },
  { id: 3, title: 'Development', src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop', alt: 'Coding' },
  { id: 4, title: 'Learning', src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop', alt: 'Learning and growth' },
]

export default function MediaSection() {
  const [selectedVideo, setSelectedVideo] = useState(null)

  return (
    <section className="mb-14">
      <h2 className="section-heading mb-2">Videos & Gallery</h2>
      <p className="text-slate-600 mb-6 text-sm max-w-2xl">
        Course-related videos and a glimpse of our environment.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-card">
          <div className="px-4 py-3 bg-gradient-to-r from-enterprise-blue-dark to-enterprise-blue text-white">
            <h3 className="font-semibold">Featured Videos</h3>
          </div>
          <div className="p-4 space-y-4">
            {VIDEOS.map((v) => (
              <div
                key={v.id}
                className="rounded-lg border border-slate-100 bg-slate-50/50 overflow-hidden"
              >
                <div className="flex gap-3 p-3">
                  <div className="flex-shrink-0 w-32 h-20 rounded-md overflow-hidden bg-slate-200">
                    {selectedVideo?.id === v.id ? (
                      <div className="w-full h-full flex items-center justify-center text-enterprise-blue text-xs">Playing below</div>
                    ) : (
                      <img src={v.thumb} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-enterprise-blue-dark text-sm leading-tight">{v.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{v.description}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(selectedVideo?.id === v.id ? null : v)}
                      className="mt-2 text-xs font-medium text-enterprise-blue hover:underline"
                    >
                      {selectedVideo?.id === v.id ? 'Hide video' : 'Watch'}
                    </button>
                  </div>
                </div>
                {selectedVideo?.id === v.id && (
                  <div className="px-3 pb-3">
                    <div className="aspect-video rounded-md overflow-hidden bg-black">
                      <iframe
                        title={v.title}
                        src={v.embedUrl}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-card">
          <div className="px-4 py-3 bg-gradient-to-r from-enterprise-blue-dark to-enterprise-blue text-white">
            <h3 className="font-semibold">Gallery</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {IMAGES.map((img) => (
                <div
                  key={img.id}
                  className="rounded-lg overflow-hidden border border-slate-100 group"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <p className="p-2 text-xs font-medium text-enterprise-blue-dark bg-slate-50">{img.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
