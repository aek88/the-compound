import { useState } from 'react'

// ── Field data ─────────────────────────────────────────────────────────────────
const SPACES = [
  { value: 'cucina-edit',      label: 'Cucina Edit — Culinary Workshop' },
  { value: 'ghost-dinners',    label: 'Ghost Dinners Kitchen — Development Kitchen' },
  { value: 'serveo-offices',   label: 'Serveo Group Offices — Office Suites' },
  { value: 'automotive-vault', label: 'Automotive Vault — Secure Vehicle Storage' },
  { value: 'cafe-coworking',   label: 'Cafe & Co-working — Central Hub' },
]

const USES = [
  { value: 'lease',            label: 'Lease — Long-term tenancy' },
  { value: 'content-creation', label: 'Content Creation — Photo / video shoot' },
  { value: 'event',            label: 'Event — Private dinner, launch, or showcase' },
  { value: 'workshop',         label: 'Workshop or Class' },
  { value: 'other',            label: 'Other' },
]

const STEPS = [
  { n: '01', label: 'Fill in the form', detail: 'Tell us about your intended use and timeline.' },
  { n: '02', label: 'We review',        detail: 'A member of the team looks over your request within 1–2 business days.' },
  { n: '03', label: "We'll be in touch", detail: 'We contact you by email or phone to discuss next steps and pricing.' },
]

const EMPTY = {
  name: '', company: '', email: '', phone: '',
  space: '', intendedUse: '', preferredDates: '', message: '',
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function Label({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-display font-700 tracking-wider uppercase text-compound-black mb-1.5"
    >
      {children}
      {required && <span className="text-compound-amber ml-1">*</span>}
    </label>
  )
}

const inputClass =
  'w-full border bg-compound-white px-4 py-3 text-[14px] text-compound-black placeholder-compound-concrete focus:outline-none transition-colors duration-150'

function fieldBorder(err) {
  return err ? 'border-red-400 focus:border-red-400' : 'border-compound-border focus:border-compound-amber'
}

function FieldError({ msg }) {
  if (!msg) return null
  return <p className="mt-1 text-[11px] text-red-500">{msg}</p>
}

function SelectArrow() {
  return (
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-compound-steel pointer-events-none"
      fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function SuccessPanel({ id }) {
  return (
    <div className="bg-compound-white border border-compound-border p-10 md:p-14 text-center">
      {/* Icon */}
      <div className="w-14 h-14 border-2 border-compound-amber mx-auto mb-8 flex items-center justify-center">
        <svg className="w-7 h-7 text-compound-amber" fill="none"
          stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <p className="text-[11px] font-display font-700 tracking-widest2 uppercase text-compound-amber mb-3">
        Inquiry Received
      </p>
      <h2 className="font-display font-800 text-2xl md:text-3xl tracking-tight text-compound-black mb-4">
        Thank you — we have your details.
      </h2>
      <p className="text-compound-steel text-[14px] leading-relaxed max-w-md mx-auto mb-2">
        A member of The Compound team will review your inquiry and follow up
        within 1–2 business days.
      </p>
      <p className="text-compound-concrete text-[12px] mb-8">
        Reference: <span className="font-display font-600 text-compound-black">#{id}</span>
      </p>

      {/* What happens next */}
      <div className="border-t border-compound-border pt-8 mt-2 text-left max-w-sm mx-auto space-y-4">
        <p className="text-[11px] font-display font-700 tracking-widest uppercase text-compound-steel">
          What happens next
        </p>
        {STEPS.map(s => (
          <div key={s.n} className="flex gap-4">
            <span className="font-display font-700 text-compound-amber text-[13px] flex-shrink-0 w-6">{s.n}</span>
            <div>
              <p className="font-display font-600 text-[13px] text-compound-black">{s.label}</p>
              <p className="text-[12px] text-compound-steel leading-snug">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function LeaseInquiry() {
  const [form, setForm]     = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')   // idle | loading | success | error
  const [serverId, setServerId]   = useState(null)
  const [serverErr, setServerErr] = useState('')

  function set(field) {
    return e => {
      setForm(f => ({ ...f, [field]: e.target.value }))
      if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
    }
  }

  function validate() {
    const e = {}
    if (!form.name.trim())                          e.name        = 'Name is required.'
    if (!form.email.trim() || !form.email.includes('@')) e.email  = 'A valid email is required.'
    if (!form.space)                                e.space       = 'Please select a space.'
    if (!form.intendedUse)                          e.intendedUse = 'Please select an intended use.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('loading')
    setServerErr('')

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:           form.name,
          company:        form.company,
          email:          form.email,
          phone:          form.phone,
          space:          form.space,
          intendedUse:    form.intendedUse,
          preferredDates: form.preferredDates,
          message:        form.message,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed.')
      setServerId(data.id)
      setStatus('success')
    } catch (err) {
      setServerErr(err.message)
      setStatus('error')
    }
  }

  return (
    <div className="bg-compound-white min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-compound-black pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-compound-amber text-[11px] font-display font-700 tracking-widest2 uppercase mb-4">
            The Compound · Dubai
          </p>
          <h1 className="font-display font-800 text-4xl md:text-6xl tracking-tight text-compound-white mb-5 max-w-2xl">
            Lease & Booking Inquiry
          </h1>
          <p className="text-compound-concrete text-base md:text-lg max-w-xl leading-relaxed">
            Whether you're looking for a long-term lease, a one-day content shoot,
            a private event, or something in between — fill in the form and we'll
            get back to you within 1–2 business days.
          </p>
        </div>
      </section>

      {/* ── Process steps ── */}
      <section className="bg-compound-surface border-b border-compound-border px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STEPS.map(s => (
            <div key={s.n} className="flex gap-4 items-start">
              <span className="font-display font-800 text-2xl text-compound-amber leading-none flex-shrink-0">
                {s.n}
              </span>
              <div>
                <p className="font-display font-700 text-[13px] tracking-wide text-compound-black mb-0.5">
                  {s.label}
                </p>
                <p className="text-[12px] text-compound-steel leading-relaxed">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Form / Success ── */}
      <section className="bg-compound-surface px-4 md:px-6 py-16">
        <div className="max-w-3xl mx-auto">

          {status === 'success' ? (
            <SuccessPanel id={serverId} />
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="bg-compound-white border border-compound-border p-6 md:p-10">

                {/* Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <Label htmlFor="name" required>Full Name</Label>
                    <input
                      id="name" type="text" autoComplete="name"
                      placeholder="Ali Al Mansouri"
                      className={`${inputClass} ${fieldBorder(errors.name)}`}
                      value={form.name} onChange={set('name')}
                    />
                    <FieldError msg={errors.name} />
                  </div>
                  <div>
                    <Label htmlFor="company">Company / Brand</Label>
                    <input
                      id="company" type="text" autoComplete="organization"
                      placeholder="Optional"
                      className={`${inputClass} ${fieldBorder()}`}
                      value={form.company} onChange={set('company')}
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <Label htmlFor="email" required>Email Address</Label>
                    <input
                      id="email" type="email" autoComplete="email"
                      placeholder="you@example.com"
                      className={`${inputClass} ${fieldBorder(errors.email)}`}
                      value={form.email} onChange={set('email')}
                    />
                    <FieldError msg={errors.email} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <input
                      id="phone" type="tel" autoComplete="tel"
                      placeholder="+971 50 000 0000"
                      className={`${inputClass} ${fieldBorder()}`}
                      value={form.phone} onChange={set('phone')}
                    />
                  </div>
                </div>

                {/* Space + Intended use */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <Label htmlFor="space" required>Space</Label>
                    <div className="relative">
                      <select
                        id="space"
                        className={`${inputClass} appearance-none pr-10 ${fieldBorder(errors.space)}`}
                        value={form.space} onChange={set('space')}
                      >
                        <option value="">Select a space…</option>
                        {SPACES.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <SelectArrow />
                    </div>
                    <FieldError msg={errors.space} />
                  </div>
                  <div>
                    <Label htmlFor="intendedUse" required>Intended Use</Label>
                    <div className="relative">
                      <select
                        id="intendedUse"
                        className={`${inputClass} appearance-none pr-10 ${fieldBorder(errors.intendedUse)}`}
                        value={form.intendedUse} onChange={set('intendedUse')}
                      >
                        <option value="">Select a use…</option>
                        {USES.map(u => (
                          <option key={u.value} value={u.value}>{u.label}</option>
                        ))}
                      </select>
                      <SelectArrow />
                    </div>
                    <FieldError msg={errors.intendedUse} />
                  </div>
                </div>

                {/* Preferred dates */}
                <div className="mb-5">
                  <Label htmlFor="preferredDates">Preferred Dates</Label>
                  <input
                    id="preferredDates" type="text"
                    placeholder="e.g. From March 2026 · 14–15 June · Flexible"
                    className={`${inputClass} ${fieldBorder()}`}
                    value={form.preferredDates} onChange={set('preferredDates')}
                  />
                  <p className="mt-1 text-[11px] text-compound-steel">
                    For leases: approximate start date. For bookings: specific date(s) or range.
                  </p>
                </div>

                {/* Message */}
                <div className="mb-8">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message" rows={5}
                    placeholder="Tell us more — what you're building, how you'll use the space, any specific requirements…"
                    className={`${inputClass} ${fieldBorder()} resize-none`}
                    value={form.message} onChange={set('message')}
                  />
                </div>

                {/* Server error */}
                {status === 'error' && serverErr && (
                  <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-700 text-[13px]">
                    {serverErr}
                  </div>
                )}

                {/* Submit */}
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
                        Submit Inquiry
                        <svg className="w-4 h-4" fill="none" stroke="currentColor"
                          strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer note ── */}
      <section className="bg-compound-black py-10 px-6 border-t border-compound-steel/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-display font-700 tracking-widest2 uppercase text-compound-amber mb-1">
              Prefer to talk directly?
            </p>
            <p className="text-compound-concrete text-[13px]">
              Reach us at{' '}
              <a href="mailto:hello@thecompound.ae"
                className="text-compound-white hover:text-compound-amber transition-colors">
                hello@thecompound.ae
              </a>
              {' '}or call{' '}
              <a href="tel:+97140000000"
                className="text-compound-white hover:text-compound-amber transition-colors">
                +971 4 000 0000
              </a>
            </p>
          </div>
          <p className="text-compound-steel text-[11px] max-w-xs leading-relaxed">
            All inquiries are reviewed by a human. We do not use automated responses
            and aim to reply within one business day.
          </p>
        </div>
      </section>

    </div>
  )
}
