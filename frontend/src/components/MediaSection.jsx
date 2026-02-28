import { useState } from 'react'

const VIDEOS = [
  {
    id: 1,
    title: 'Welcome to E and E Software Solution',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'A quick overview of our services and how we help businesses with software development.',
  },
  {
    id: 2,
    title: 'Java & Spring Boot in Practice',
    embedUrl: 'https://www.youtube.com/embed/9SGDpanrc8U',
    description: 'See how we build robust backends with Spring Boot and best practices.',
  },
  {
    id: 3,
    title: 'Modern Frontend with React',
    embedUrl: 'https://www.youtube.com/embed/SqcY0GlETpg',
    description: 'Building fast, maintainable UIs with React and Vite.',
  },
]

const IMAGES = [
  {
    id: 1,
    title: 'Our workspace',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    alt: 'Modern office workspace',
  },
  {
    id: 2,
    title: 'Team collaboration',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    alt: 'Team working together',
  },
  {
    id: 3,
    title: 'Development',
    src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
    alt: 'Coding and development',
  },
]

export default function MediaSection() {
  const [selectedVideo, setSelectedVideo] = useState(null)

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-enterprise-blue-dark mb-6">Videos & Gallery</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-3">Featured Videos</h3>
          <div className="space-y-3">
            {VIDEOS.map((v) => (
              <div
                key={v.id}
                className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-enterprise-blue">{v.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{v.description}</p>
                {selectedVideo?.id === v.id ? (
                  <>
                    <div className="mt-3 aspect-video rounded-md overflow-hidden">
                      <iframe
                        title={v.title}
                        src={v.embedUrl}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(null)}
                      className="mt-2 text-sm text-slate-500 hover:text-slate-700"
                    >
                      Close video
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(v)}
                    className="mt-3 px-3 py-1.5 rounded bg-enterprise-blue text-white text-sm hover:bg-enterprise-blue-light"
                  >
                    Watch video
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-3">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {IMAGES.map((img) => (
              <div
                key={img.id}
                className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <p className="p-2 text-sm font-medium text-enterprise-blue">{img.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
