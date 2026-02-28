export default function ContactSection() {
  const phone = '4049029256'
  const phoneDisplay = '(404) 902-9256'
  const email = 'kamalrml2009@gmail.com'
  const address = '4334 Catamount DR, Lilburn, GA, US'

  return (
    <section className="mb-14">
      <h2 className="section-heading mb-2">Contact Us</h2>
      <p className="text-slate-600 mb-4 text-sm max-w-2xl">
        Get in touch for courses, consulting, or custom development.
      </p>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-enterprise-blue/10 flex items-center justify-center">
              <span className="text-enterprise-blue text-lg" aria-hidden>📞</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</p>
              <a href={`tel:${phone}`} className="link-external mt-1 block">
                {phoneDisplay}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-enterprise-blue/10 flex items-center justify-center">
              <span className="text-enterprise-blue text-lg" aria-hidden>✉️</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</p>
              <a href={`mailto:${email}`} className="link-external mt-1 block break-all">
                {email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-enterprise-blue/10 flex items-center justify-center">
              <span className="text-enterprise-blue text-lg" aria-hidden>📍</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Address</p>
              <p className="mt-1 text-enterprise-blue-dark font-medium">
                {address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
