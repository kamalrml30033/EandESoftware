/** Static articles, docs, and video links — no backend. */

const RESOURCES = [
  {
    category: 'Java',
    items: [
      { title: 'Oracle Java Tutorials', url: 'https://docs.oracle.com/javase/tutorial/', type: 'docs', desc: 'Official Java tutorials and trail map.' },
      { title: 'Baeldung – Java', url: 'https://www.baeldung.com/java-tutorial', type: 'article', desc: 'In-depth articles on core Java and APIs.' },
      { title: 'Java YouTube – Amigoscode', url: 'https://www.youtube.com/watch?v=8MmMm2-kJV8', type: 'video', desc: 'Java full course for beginners.' },
    ],
  },
  {
    category: 'Spring Boot',
    items: [
      { title: 'Spring Boot Reference', url: 'https://docs.spring.io/spring-boot/docs/current/reference/html/', type: 'docs', desc: 'Official Spring Boot documentation.' },
      { title: 'Spring Guides', url: 'https://spring.io/guides', type: 'article', desc: 'Getting started guides and tutorials.' },
      { title: 'Baeldung – Spring', url: 'https://www.baeldung.com/spring-tutorial', type: 'article', desc: 'Spring and Spring Boot tutorials.' },
      { title: 'Spring Boot – YouTube', url: 'https://www.youtube.com/watch?v=9SGDpanrc8U', type: 'video', desc: 'Spring Boot crash course.' },
    ],
  },
  {
    category: 'React & Frontend',
    items: [
      { title: 'React Docs', url: 'https://react.dev', type: 'docs', desc: 'Official React documentation (react.dev).' },
      { title: 'Vite Guide', url: 'https://vitejs.dev/guide/', type: 'docs', desc: 'Vite build tool and dev server.' },
      { title: 'Tailwind CSS', url: 'https://tailwindcss.com/docs', type: 'docs', desc: 'Utility-first CSS framework.' },
      { title: 'React – freeCodeCamp', url: 'https://www.youtube.com/watch?v=SqcY0GlETpg', type: 'video', desc: 'Full React course for beginners.' },
    ],
  },
  {
    category: 'General & Learning',
    items: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'docs', desc: 'Web standards, HTML, CSS, JavaScript.' },
      { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org', type: 'article', desc: 'Free coding curriculum and certifications.' },
      { title: 'REST API Tutorial', url: 'https://restfulapi.net/', type: 'article', desc: 'REST concepts and best practices.' },
    ],
  },
]

const typeLabel = (type) => {
  switch (type) {
    case 'video': return 'Video'
    case 'docs': return 'Docs'
    default: return 'Article'
  }
}

const typeStyles = {
  video: 'bg-rose-100 text-rose-800',
  docs: 'bg-emerald-100 text-emerald-800',
  article: 'bg-sky-100 text-sky-800',
}

export default function ArticlesSection() {
  return (
    <section className="mb-14">
      <h2 className="section-heading mb-2">Articles, Docs & Videos</h2>
      <p className="text-slate-600 mb-6 text-sm max-w-2xl">
        Curated links to official docs, tutorials, and courses to support your learning. All open in a new tab.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {RESOURCES.map(({ category, items }) => (
          <div
            key={category}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <h3 className="font-semibold text-enterprise-blue-dark mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-enterprise-blue" />
              {category}
            </h3>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-external block text-sm"
                  >
                    {item.title}
                  </a>
                  <span className={`inline-block mt-0.5 text-xs px-1.5 py-0.5 rounded ${typeStyles[item.type] || typeStyles.article}`}>
                    {typeLabel(item.type)}
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
