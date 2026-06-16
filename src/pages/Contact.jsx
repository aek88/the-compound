import { useState } from 'react'

// ── Social links (swap in real URLs when accounts are live) ───────────────────
const SOCIALS = [
  {
    name: 'Instagram',
    handle: '@thecompounddxb',
    href: 'https://instagram.com/thecompounddxb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@thecompounddxb',
    href: 'https://tiktok.com/@thecompounddxb',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.37 6.37 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'The Compound Dubai',
    href: 'https://linkedin.com/company/thecompounddxb',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 .5-2 1.9v7.1h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1.4-1-2-2-2z" />
      </svg>
    ),
  },
  {
    name: 'X',
    handle: '@thecompounddxb',
    href: 'https://x.com/thecompounddxb',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.243 2.25z" />
      </svg>
    ),
  },
]

const SUBJECTS = [
  { value: 'general',     label: 'General Inquiry' },
  { value: 'press',       label: 'Press & Media' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'event',       label: 'Event or Private Hire' },
  { value: 'other',       label: 'Other' },
]

const EMPTY = { name: '', email: '', subject: '', message: '' }

// ── Sub-components ─────────────────────────────────────────────────────────────

function Label({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-display font-700 tracking-wider uppercase text-compound-black mb-1.5"
    >
      {children}{required && <span className="text-compound-amber ml-1">*</span>}
    </label>
  )
}

const inputCls = 'w-full border bg-compound-white px-4 py-3 text-[14px] text-compound-black placeholder-compound-concrete focus:outline-none transition-colors duration-150'
const border = err => err ? 'border-red-400' : 'border-compound-border focus:border-compound-amber'

function MapPlaceholder() {
  return (
    <div className="relative overflow-hidden bg-compound-black" style={{ height: 220 }}>
      {/* Subtle grid texture */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cgrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cgrid)" />
      </svg>

      {/* Pin + label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <svg className="w-10 h-10 text-compound-amber" fill="none"
          stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <div className="text-center">
          <p className="font-display font-700 text-compound-white text-[13px] tracking-wide">
            The Compound
          </p>
          <p className="text-compound-concrete text-[11px]">Dubai, United Arab Emirates</p>
        </div>
      </div>

      {/* View on maps link */}
      <a
        href="https://maps.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] font-display font-600 tracking-widest uppercase text-compound-amber hover:text-compound-amber-light transition-colors"
      >
        View on Maps
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm]       = useState(EMPTY)
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState('idle')
  const [serverErr, setServerErr] = useState('')

  function set(field) {
    return e => {
      setForm(f => ({ ...f, [field]: e.target.value }))
      if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
    }
  }

  function validate() {
    const e = {}
    if (!form.name.trim())                               e.name    = 'Name is required.'
    if (!form.email.trim() || !form.email.includes('@')) e.email   = 'A valid email is required.'
    if (!form.message.trim())                            e.message = 'Message is required.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    setServerErr('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed.')
      setStatus('success')
    } catch (err) {
      setServerErr(err.message)
      setStatus('error')
    }
  }

  return (
    <div className="bg-compound-white min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-compound-black pt-28 pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-compound-amber text-[11px] font-display font-700 tracking-widest2 uppercase mb-4">
            The Compound · Dubai, UAE
          </p>
          <h1 className="font-display font-800 text-4xl md:text-6xl tracking-tight text-compound-white mb-5">
            Get In Touch
          </h1>
          <p className="text-compound-concrete text-base md:text-lg max-w-xl leading-relaxed">
            Questions, press inquiries, partnership ideas, or just curious about The Compound —
            drop us a message and we'll get back to you promptly.
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="bg-compound-surface px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left col: location + socials ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Map placeholder */}
            <div className="border border-compound-border overflow-hidden">
              <MapPlaceholder />
              <div className="bg-compound-white p-5 border-t border-compound-border space-y-3">
                {[
                  {
                    icon: (
                      <svg className="w-4 h-4 flex-shrink-0 text-compound-amber mt-0.5" fill="none"
                        stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    ),
                    label: 'Address',
                    value: 'Warehouse District, Al Quoz\nDubai, United Arab Emirates',
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4 flex-shrink-0 text-compound-amber mt-0.5" fill="none"
                        stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                    label: 'Email',
                    value: 'hello@thecompound.ae',
                    href: 'mailto:hello@thecompound.ae',
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4 flex-shrink-0 text-compound-amber mt-0.5" fill="none"
                        stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    ),
                    label: 'Phone',
                    value: '+971 4 000 0000',
                    href: 'tel:+97140000000',
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4 flex-shrink-0 text-compound-amber mt-0.5" fill="none"
                        stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    label: 'Hours',
                    value: 'Cafe & Co-working: Mon–Sun, 7am–10pm\nOffice & Vault: By appointment',
                  },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex gap-3">
                    {icon}
                    <div>
                      <p className="text-[10px] font-display font-700 tracking-widest uppercase text-compound-steel mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a href={href}
                          className="text-[13px] text-compound-black hover:text-compound-amber transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-[13px] text-compound-black whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="bg-compound-white border border-compound-border p-5">
              <p className="text-[11px] font-display font-700 tracking-widest2 uppercase text-compound-steel mb-4">
                Follow The Compound
              </p>
              <div className="space-y-3">
                {SOCIALS.map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-9 h-9 border border-compound-border flex items-center justify-center text-compound-steel group-hover:border-compound-amber group-hover:text-compound-amber transition-colors duration-200 flex-shrink-0">
                      {s.icon}
                    </span>
                    <div>
                      <p className="text-[12px] font-display font-700 text-compound-black group-hover:text-compound-amber transition-colors leading-tight">
                        {s.name}
                      </p>
                      <p className="text-[11px] text-compound-steel">{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right col: form ── */}
          <div className="lg:col-span-3">
            <div className="bg-compound-white border border-compound-border p-6 md:p-10">

              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 border-2 border-compound-amber mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-6 h-6 text-compound-amber" fill="none"
                      stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[11px] font-display font-700 tracking-widest2 uppercase text-compound-amber mb-3">
                    Message Sent
                  </p>
                  <h2 className="font-display font-800 text-2xl text-compound-black mb-3">
                    Thanks for reaching out.
                  </h2>
                  <p className="text-compound-steel text-[14px] leading-relaxed max-w-sm mx-auto mb-6">
                    We read every message and aim to reply within one business day.
                  </p>
                  <button
                    onClick={() => { setForm(EMPTY); setStatus('idle') }}
                    className="text-[11px] font-display font-700 tracking-widest uppercase text-compound-steel hover:text-compound-black transition-colors border-b border-compound-border pb-0.5"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <p className="font-display font-700 text-[13px] tracking-wide text-compound-black mb-6 pb-4 border-b border-compound-border">
                    General Inquiry Form
                  </p>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <Label htmlFor="cn-name" required>Your Name</Label>
                      <input
                        id="cn-name" type="text" autoComplete="name"
                        placeholder="Ali Al Mansouri"
                        className={`${inputCls} ${border(errors.name)}`}
                        value={form.name} onChange={set('name')}
                      />
                      {errors.name && <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="cn-email" required>Email Address</Label>
                      <input
                        id="cn-email" type="email" autoComplete="email"
                        placeholder="you@example.com"
                        className={`${inputCls} ${border(errors.email)}`}
                        value={form.email} onChange={set('email')}
                      />
                      {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-5">
                    <Label htmlFor="cn-subject">Subject</Label>
                    <div className="relative">
                      <select
                        id="cn-subject"
                        className={`${inputCls} appearance-none pr-10 ${border()}`}
                        value={form.subject} onChange={set('subject')}
                      >
                        <option value="">Select a subject…</option>
                        {SUBJECTS.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-compound-steel pointer-events-none"
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-8">
                    <Label htmlFor="cn-message" required>Message</Label>
                    <textarea
                      id="cn-message" rows={6}
                      placeholder="How can we help?"
                      className={`${inputCls} ${border(errors.message)} resize-none`}
                      value={form.message} onChange={set('message')}
                    />
                    {errors.message && <p className="mt-1 text-[11px] text-red-500">{errors.message}</p>}
                  </div>

                  {serverErr && (
                    <div className="mb-5 p-4 border border-red-300 bg-red-50 text-red-700 text-[13px]">
                      {serverErr}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-[11px] text-compound-steel">
                      <span className="text-compound-amber">*</span> Required fields
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-10 py-4 bg-compound-black hover:bg-compound-steel text-compound-white text-[12px] font-display font-700 tracking-widest uppercase flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10"
                              stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4" fill="none" stroke="currentColor"
                            strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                              d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
