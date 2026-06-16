import { useState } from 'react'
import { Link } from 'react-router-dom'
import AutomotiveVaultFloorPlan from '../components/floorplans/AutomotiveVaultFloorPlan'

// ─── Design tokens ────────────────────────────────────────────────────────────
const ACCENT     = '#3a5a72'
const ACCENT_L   = '#4d7090'
const ACCENT_DIM = 'rgba(58,90,114,0.15)'

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    ),
    title: 'Secure, Walled-Off Section',
    description: 'The Vault sits in a fully enclosed, independently secured section of The Compound — physically separated from all food and commercial activity, with biometric access control and 24/7 CCTV coverage.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    ),
    title: 'Hydraulic Car Lift',
    description: "A two-post hydraulic lift rated for supercar tolerances — allowing vertical storage of a second vehicle above the lift bay's footprint, maximising capacity within the vault.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    ),
    title: 'Glass Viewing Wall',
    description: "Floor-to-ceiling structural glass separates the Vault from The Compound's public gallery corridor — your collection is visible to invited guests and members without granting access to the storage area.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    ),
    title: 'Climate-Controlled Environment',
    description: 'Temperature and humidity levels are continuously maintained within manufacturer-recommended ranges — protecting paint, seals, rubber, and electronics on long-term stored vehicles.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    ),
    title: 'Detail & Wash Bay',
    description: "An enclosed wash and detailing bay with drainage channel, pressure-wash point, and equipment storage — so vehicles can be prepared before collection or thoroughly cleaned after use.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375z" />
    ),
    title: 'Display & Event Use',
    description: 'The glass viewing wall makes the Vault a natural centrepiece for member events, brand days, and private viewings — vehicles on display become part of The Compound experience without leaving the secured space.',
  },
]

const CAPACITY = [
  { value: '5',       label: 'Vehicle Capacity',     sub: 'supercar-sized bays (4 floor + 1 lift)' },
  { value: '2,800',   label: 'Square Feet',           sub: 'total Vault footprint' },
  { value: '24/7',    label: 'Security Coverage',     sub: 'CCTV + biometric access' },
  { value: '1',       label: 'Hydraulic Car Lift',    sub: '2-post, supercar-rated' },
  { value: '1',       label: 'Glass Viewing Wall',    sub: 'floor-to-ceiling structural glazing' },
  { value: '1',       label: 'Detail & Wash Bay',     sub: 'enclosed, fully equipped' },
]

const GALLERY_IMAGES = [
  {
    label: 'The Vault',
    gradient: 'linear-gradient(155deg, #050708 0%, #0b0f14 35%, #111820 65%, #182030 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l60 60M60 0L0 60' stroke='%23fff' stroke-width='0.3' opacity='0.05'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Climate-controlled vault — 4 floor bays + car lift',
  },
  {
    label: 'Glass Wall',
    gradient: 'linear-gradient(135deg, #06090d 0%, #0d1520 45%, #152030 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='20' height='80' viewBox='0 0 20 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='10' y1='0' x2='10' y2='80' stroke='%235588cc' stroke-width='0.6' opacity='0.25'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Floor-to-ceiling glazed viewing gallery',
  },
  {
    label: 'Car Lift',
    gradient: 'linear-gradient(145deg, #070c12 0%, #0f1826 45%, #172436 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0M0 20L20 0M20 40L40 20' stroke='%23fff' stroke-width='0.35' opacity='0.06'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Two-post hydraulic lift — supercar-rated',
  },
  {
    label: 'Detail Bay',
    gradient: 'linear-gradient(135deg, #080c10 0%, #10182a 45%, #182436 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ffffff' opacity='0.07'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Enclosed wash & detail bay with drainage',
  },
]

const FLOOR_ZONES = [
  { color: '#3a5a72', label: 'Vehicle Storage Vault',       sub: '4 floor bays + car lift' },
  { color: '#5588bb', label: 'Glass Viewing Gallery',       sub: 'Floor-to-ceiling glazing' },
  { color: '#2a3a48', label: 'Detail & Wash Bay',           sub: 'Enclosed, with drainage' },
  { color: '#3a3a38', label: 'Reception & Check-In',        sub: 'Biometric entry point' },
  { color: '#4a4a48', label: 'Equipment & Tyre Store',      sub: 'Tools, accessories, tyres' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionEyebrow({ children }) {
  return (
    <span className="flex items-center gap-3 mb-5">
      <span className="w-6 h-px" style={{ background: ACCENT }} />
      <span className="font-body text-[11px] font-medium tracking-widest2 uppercase"
        style={{ color: ACCENT }}>
        {children}
      </span>
    </span>
  )
}

// ─── Floor Plan wrapper ────────────────────────────────────────────────────────

function FloorPlan() { return <AutomotiveVaultFloorPlan /> }

// ─── Inquiry Form ─────────────────────────────────────────────────────────────

function InquiryForm() {
  const [form, setForm] = useState({
    type: '', name: '', email: '', phone: '', company: '', vehicles: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.type)  e.type  = 'Please select an enquiry type.'
    if (!form.name)  e.name  = 'Name is required.'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                     e.email = 'A valid email is required.'
    return e
  }

  const handleSubmit = ev => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSubmitted(true)
  }

  const inputClass = k =>
    `w-full bg-compound-surface border px-4 py-3 font-body text-[0.9rem] text-compound-black
     placeholder:text-compound-concrete focus:outline-none transition-colors
     ${errors[k] ? 'border-red-400' : 'border-compound-border'}`

  const focusStyle = { outlineColor: ACCENT }
  const labelClass = 'block font-body text-[11px] font-medium tracking-widest uppercase text-compound-steel mb-1.5'

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <span className="w-12 h-12 border-2 flex items-center justify-center"
          style={{ borderColor: ACCENT }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            style={{ color: ACCENT }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3 className="font-display font-700 text-[1.5rem] text-compound-black">Enquiry Received</h3>
        <p className="font-body text-compound-steel max-w-sm">
          Thank you, {form.name}. Our team will be in touch within 24 hours at {form.email} with
          availability and full information.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Enquiry type */}
      <div className="md:col-span-2">
        <label className={labelClass}>Type of Enquiry *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {['Vehicle Storage', 'Annual Membership', 'Event / Display', 'Photography / Filming', 'Car Lift Use', 'Custom Arrangement'].map(t => (
            <button
              key={t} type="button"
              onClick={() => set('type', t)}
              className={`px-3 py-2.5 border text-[11px] font-body font-medium tracking-wider uppercase transition-colors text-left
                ${form.type === t
                  ? 'border-[#3a5a72] text-[#3a5a72]'
                  : 'border-compound-border text-compound-steel hover:border-compound-concrete'}`}
              style={form.type === t ? { background: ACCENT_DIM } : {}}
            >
              {t}
            </button>
          ))}
        </div>
        {errors.type && <p className="mt-1.5 text-[12px] text-red-500">{errors.type}</p>}
      </div>

      {/* Name */}
      <div>
        <label htmlFor="vname" className={labelClass}>Full Name *</label>
        <input id="vname" type="text" placeholder="Your name" value={form.name}
          onChange={e => set('name', e.target.value)}
          className={inputClass('name')} style={focusStyle} />
        {errors.name && <p className="mt-1.5 text-[12px] text-red-500">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="vemail" className={labelClass}>Email Address *</label>
        <input id="vemail" type="email" placeholder="you@example.com" value={form.email}
          onChange={e => set('email', e.target.value)}
          className={inputClass('email')} style={focusStyle} />
        {errors.email && <p className="mt-1.5 text-[12px] text-red-500">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="vphone" className={labelClass}>Phone Number</label>
        <input id="vphone" type="tel" placeholder="+971 __ ___ ____" value={form.phone}
          onChange={e => set('phone', e.target.value)}
          className={inputClass('phone')} style={focusStyle} />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="vcompany" className={labelClass}>Company / Name on Account</label>
        <input id="vcompany" type="text" placeholder="Optional" value={form.company}
          onChange={e => set('company', e.target.value)}
          className={inputClass('company')} style={focusStyle} />
      </div>

      {/* Vehicles */}
      <div className="md:col-span-2">
        <label htmlFor="vvehicles" className={labelClass}>Vehicles You Intend to Store</label>
        <input id="vvehicles" type="text"
          placeholder="e.g. Ferrari 488, Lamborghini Urus, Porsche 911 GT3"
          value={form.vehicles}
          onChange={e => set('vehicles', e.target.value)}
          className={inputClass('vehicles')} style={focusStyle} />
      </div>

      {/* Notes */}
      <div className="md:col-span-2">
        <label htmlFor="vnotes" className={labelClass}>Additional Notes</label>
        <textarea id="vnotes" rows="4"
          placeholder="Tell us about your requirements — storage duration, access frequency, special dimensions, event use, or any questions…"
          value={form.notes}
          onChange={e => set('notes', e.target.value)}
          className={inputClass('notes') + ' resize-none'} style={focusStyle} />
      </div>

      <div className="md:col-span-2 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          className="inline-flex items-center gap-3 px-8 py-4 text-compound-white font-display font-600 text-[13px] tracking-widest uppercase transition-colors duration-200"
          style={{ background: ACCENT }}
          onMouseEnter={e => e.currentTarget.style.background = ACCENT_L}
          onMouseLeave={e => e.currentTarget.style.background = ACCENT}
        >
          Send Enquiry
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <p className="font-body text-[12px] text-compound-concrete">
          We respond within 24 hours.
        </p>
      </div>
    </form>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AutomotiveVault() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(155deg, #050607 0%, #0b0f14 30%, #111820 55%, #162030 78%, #1e2a3c 100%)',
        }}>
          {/* Carbon-fibre diagonal grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28L28 0M14 28L28 14M0 14L14 0' stroke='%23fff' stroke-width='0.35' opacity='0.06'/%3E%3C/svg%3E")`,
            backgroundSize: '28px 28px',
          }} />
          {/* Ghost watermark */}
          <div className="absolute inset-0 flex items-center justify-end px-10 overflow-hidden select-none" aria-hidden>
            <span className="font-display font-800 text-[18vw] leading-none tracking-tight uppercase"
              style={{ color: 'rgba(58,90,114,0.08)' }}>
              VAULT
            </span>
          </div>
          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          {/* Accent vertical rule */}
          <div className="absolute top-0 left-24 w-px h-full opacity-20"
            style={{ background: ACCENT }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 lg:pb-24 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 text-[11px] font-body tracking-widest uppercase text-compound-white/40">
            <Link to="/" className="hover:text-compound-white/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="hover:text-compound-white/70 transition-colors cursor-pointer">Spaces</span>
            <span>/</span>
            <span style={{ color: ACCENT }}>Automotive Vault</span>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px" style={{ background: ACCENT }} />
            <span className="font-body text-[11px] tracking-widest2 uppercase" style={{ color: ACCENT }}>
              Supercar Storage · The Compound, Dubai
            </span>
          </div>

          <h1 className="font-display font-800 text-compound-white leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            Automotive<br />Vault
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <p className="font-body text-compound-white/60 text-[1.05rem] max-w-lg leading-relaxed">
              A climate-controlled, independently secured vault for storing high-value
              supercars — with a glass viewing wall, hydraulic lift, and detail bay.
            </p>
            <a
              href="#inquire"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 text-compound-white font-display font-600 text-[11px] tracking-widest uppercase transition-colors"
              style={{ background: ACCENT }}
              onMouseEnter={e => e.currentTarget.style.background = ACCENT_L}
              onMouseLeave={e => e.currentTarget.style.background = ACCENT}
            >
              Inquire About Vehicle Storage
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            {[
              { v: '2,800', u: 'sq ft' },
              { v: '5',     u: 'Vehicle Bays' },
              { v: '1',     u: 'Hydraulic Lift' },
              { v: '24/7',  u: 'Security' },
            ].map(({ v, u }) => (
              <div key={u}>
                <p className="font-display font-800 text-compound-white text-[1.8rem] leading-none">
                  {v}<span className="text-[1rem] ml-1" style={{ color: ACCENT }}>{u}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESCRIPTION ── */}
      <section className="bg-compound-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">

          {/* Main text */}
          <div>
            <SectionEyebrow>About The Space</SectionEyebrow>
            <h2 className="font-display font-800 leading-none tracking-tight text-compound-black mb-8"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
              Where Supercars Live
            </h2>
            <div className="space-y-5 font-body text-compound-steel leading-relaxed text-[0.95rem] max-w-prose">
              <p>
                The Automotive Vault is a fully self-contained, independently secured section of The Compound — physically walled off and air-gapped from every food and commercial operation on-site. Entry is biometric; the space has its own dedicated roller door for vehicle access and is monitored around the clock.
              </p>
              <p>
                Inside, climate control maintains manufacturer-recommended temperature and humidity levels at all times, protecting paint, rubber, seals, and electronics on vehicles regardless of how long they remain in storage. Battery trickle chargers are available for each bay, and the detail bay allows owners to receive their cars in pristine condition or have them prepared before collection.
              </p>
              <p>
                The centrepiece of the Vault is its floor-to-ceiling glass viewing wall — a structural glass panel that faces onto The Compound's internal gallery corridor. Stored cars are visible to invited guests, members, and event attendees without anyone entering the secured vault itself. It transforms a storage arrangement into a living display.
              </p>
              <p>
                A two-post hydraulic car lift allows the vault to accommodate a fifth vehicle above the lift bay, maximising capacity without expanding the footprint. Membership is available on an annual basis; individual bay rental and event use are available on enquiry.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="border border-compound-border p-6">
              <p className="font-display font-700 text-[11px] tracking-widest2 uppercase mb-5"
                style={{ color: ACCENT }}>
                At a Glance
              </p>
              <ul className="space-y-4">
                {[
                  ['Size',        '2,800 sq ft'],
                  ['Capacity',    'Up to 5 vehicles'],
                  ['Access',      'Biometric — owners only'],
                  ['Viewing',     'Glass wall from Compound gallery'],
                  ['Security',    '24/7 CCTV · monitored entry'],
                  ['Pricing',     'On enquiry'],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-3">
                    <span className="font-body text-[11px] font-600 tracking-widest uppercase text-compound-concrete w-20 shrink-0 pt-0.5">
                      {k}
                    </span>
                    <span className="font-body text-[0.875rem] text-compound-black">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-compound-border p-6">
              <p className="font-display font-700 text-[11px] tracking-widest2 uppercase mb-5"
                style={{ color: ACCENT }}>
                Vault Equipment
              </p>
              <ul className="space-y-2.5">
                {[
                  '2-post hydraulic car lift (supercar-rated)',
                  'Floor-to-ceiling glass viewing wall',
                  'Climate control — temperature + humidity',
                  'Battery trickle charger (per bay)',
                  '24/7 CCTV and biometric access',
                  'Detail & wash bay (enclosed)',
                  'Tyre storage racks',
                  'Equipment & accessories storage',
                  'Dedicated vehicle roller door access',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 mt-2 shrink-0" style={{ background: ACCENT }} />
                    <span className="font-body text-[0.875rem] text-compound-steel">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#inquire"
              className="flex items-center justify-center gap-3 w-full py-4 text-compound-white font-display font-600 text-[12px] tracking-widest uppercase transition-colors"
              style={{ background: ACCENT }}
              onMouseEnter={e => e.currentTarget.style.background = ACCENT_L}
              onMouseLeave={e => e.currentTarget.style.background = ACCENT}
            >
              Inquire About Vehicle Storage
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </aside>
        </div>
      </section>

      {/* ── FLOOR PLAN ── */}
      <section className="bg-compound-surface py-20 lg:py-28 border-t border-compound-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionEyebrow>Layout</SectionEyebrow>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <h2 className="font-display font-800 leading-none tracking-tight text-compound-black"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
              Floor Plan
            </h2>
            <p className="font-body text-compound-steel text-[0.875rem] max-w-xs">
              Illustrative layout — exact dimensions and bay configuration confirmed upon enquiry.
            </p>
          </div>

          <div className="bg-compound-white border border-compound-border p-4 lg:p-8 shadow-sm">
            <FloorPlan />
          </div>

          {/* Zone legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            {FLOOR_ZONES.map(({ color, label, sub }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="w-3 h-3 shrink-0 mt-1" style={{ background: color, opacity: 0.75 }} />
                <div>
                  <p className="font-body text-[13px] font-medium text-compound-black">{label}</p>
                  <p className="font-body text-[11px] text-compound-steel">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="bg-compound-white py-20 lg:py-28 border-t border-compound-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionEyebrow>Rendered Visuals</SectionEyebrow>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <h2 className="font-display font-800 leading-none tracking-tight text-compound-black"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
              Design Gallery
            </h2>
            <p className="font-body text-compound-steel text-[0.875rem] max-w-xs">
              Architectural render placeholders — photography coming upon completion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GALLERY_IMAGES.map(img => (
              <div key={img.label} className="group relative overflow-hidden">
                <div className={`relative w-full ${img.aspect} overflow-hidden`}
                  style={{ background: img.gradient }}>
                  <div className="absolute inset-0" style={{
                    backgroundImage: img.pattern,
                    backgroundSize: '40px 40px',
                  }} />
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden>
                    <span className="font-display font-800 text-[5rem] lg:text-[7rem] leading-none tracking-tight uppercase"
                      style={{ color: 'rgba(58,90,114,0.10)' }}>
                      {img.label}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-body text-[10px] tracking-widest2 uppercase mb-1"
                      style={{ color: ACCENT_L }}>
                      Automotive Vault
                    </p>
                    <p className="font-display font-700 text-compound-white text-[1.05rem]">
                      {img.label}
                    </p>
                    <p className="font-body text-compound-white/60 text-[0.8rem] mt-0.5">
                      {img.sub}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 px-2.5 py-1 border border-white/20 bg-black/30 backdrop-blur-sm">
                    <span className="font-body text-[9px] tracking-widest uppercase text-white/50">Render</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPACITY & FEATURES ── */}
      <section className="bg-compound-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionEyebrow>Capacity & Features</SectionEyebrow>
          <h2 className="font-display font-800 leading-none tracking-tight text-compound-white mb-14"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
            Built for High-Value<br />Vehicle Collection
          </h2>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 mb-px">
            {CAPACITY.map(({ value, label, sub }) => (
              <div key={label} className="bg-compound-black p-8">
                <p className="font-display font-800 text-[2.5rem] leading-none mb-2"
                  style={{ color: ACCENT_L }}>
                  {value}
                </p>
                <p className="font-body text-[13px] font-medium text-compound-white mb-1">{label}</p>
                <p className="font-body text-[12px] text-compound-white/30">{sub}</p>
              </div>
            ))}
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 mt-px">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-compound-black p-8 flex flex-col gap-4 hover:bg-[#111] transition-colors group">
                <div className="w-10 h-10 border flex items-center justify-center group-hover:border-current transition-colors"
                  style={{ borderColor: `${ACCENT}55`, color: ACCENT }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="font-display font-700 text-[1rem] text-compound-white leading-snug">
                  {f.title}
                </h3>
                <p className="font-body text-[0.875rem] text-compound-white/40 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="inquire" className="bg-compound-surface py-20 lg:py-28 border-t border-compound-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">

            {/* Left: context */}
            <div>
              <SectionEyebrow>Enquire</SectionEyebrow>
              <h2 className="font-display font-800 leading-none tracking-tight text-compound-black mb-6"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                Inquire About<br />Vehicle Storage
              </h2>
              <p className="font-body text-compound-steel text-[0.9rem] leading-relaxed mb-8">
                Submit your enquiry and a member of The Compound team will respond within 24 hours with
                availability, bay options, and full pricing details.
              </p>
              <div className="space-y-4 font-body text-[0.875rem]">
                {[
                  ['Storage',    'Annual membership or flexible-term'],
                  ['Bay Sizes',  'Supercar-width bays + lift bay'],
                  ['Access',     "24/7 — owner's access at any time"],
                  ['Add-ons',    'Detail & wash · battery service · display events'],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 pb-4 border-b border-compound-border">
                    <span className="w-24 shrink-0 text-[11px] font-600 font-body tracking-widest uppercase text-compound-concrete pt-0.5">
                      {k}
                    </span>
                    <span className="text-compound-black">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-compound-white border border-compound-border p-8 lg:p-10">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER SPACES ── */}
      <section className="bg-compound-white py-16 border-t border-compound-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-body text-[11px] tracking-widest2 uppercase mb-1" style={{ color: ACCENT }}>
              Explore More
            </p>
            <p className="font-display font-700 text-[1.15rem] text-compound-black">
              Browse all spaces at The Compound
            </p>
          </div>
          <Link
            to="/#spaces"
            className="inline-flex items-center gap-3 px-7 py-3.5 border border-compound-black text-compound-black font-display font-600 text-[12px] tracking-widest uppercase hover:bg-compound-black hover:text-compound-white transition-colors duration-200"
          >
            View All Spaces
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
