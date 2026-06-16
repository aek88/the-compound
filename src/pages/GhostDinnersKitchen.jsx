import { useState } from 'react'
import { Link } from 'react-router-dom'
import GhostDinnersFloorPlan from '../components/floorplans/GhostDinnersFloorPlan'

// ─── Design tokens for this space ────────────────────────────────────────────
// Accent: cool sage-green to distinguish from Cucina Edit's terracotta

const ACCENT   = '#4d8c76'
const ACCENT_L = '#6aab93'

// ─── Data ────────────────────────────────────────────────────────────────────

const USE_CASES = [
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.3 24.3 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.15.066A2.25 2.25 0 0118 13.5v1.5M14.25 3.104c.251.023.501.05.75.082M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm7.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm7.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />,
    title: 'Food Brand Development',
    description: "Ghost Dinners ME uses this kitchen as its primary R&D engine — developing, stress-testing, and scaling new food brand concepts from initial idea through to launch-ready product.",
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />,
    title: 'Recipe Testing & Iteration',
    description: 'Rigorous, repeatable testing cycles run in a fully-specced commercial environment — precise temperature control, professional equipment, and the space to run multiple variations simultaneously.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />,
    title: 'Content Creation',
    description: 'A dedicated content studio adjacent to the kitchen enables immediate dish photography and video production — capturing food at its best for social campaigns, brand decks, and editorial shoots.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />,
    title: 'Commercial Production Runs',
    description: 'High-volume batch production using the full commercial fit-out — suitable for catering prep, meal kit assembly, sauce production, and delivery-ready packaging at scale.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    title: 'Third-Party Kitchen Rental',
    description: 'Available to Cucina Edit and vetted external operators for day or half-day hire — ideal for pop-up brands, delivery concepts, catering businesses, or food startups needing a certified commercial kitchen.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
    title: 'New Menu Development',
    description: "Restaurant groups, hotel F&B teams, and independent chefs book the kitchen to develop and pressure-test new menus in a neutral, fully-equipped environment away from their own busy operations.",
  },
]


const FLOOR_ZONES = [
  { color: '#2a4a3e', label: 'Development Kitchen', sub: '6 Commercial Stations' },
  { color: '#162840', label: 'Walk-in Refrigeration', sub: 'Cold & Frozen Storage' },
  { color: '#1a1a18', label: 'Content Studio', sub: 'Photo & Video Setup' },
  { color: '#2a2a22', label: 'Dispatch & Packaging', sub: 'Fulfilment Station' },
  { color: '#2e2010', label: 'Dry Store', sub: 'Ingredient & Equipment' },
  { color: '#222222', label: 'Wash Bay', sub: 'Triple-sink + Dishwasher' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionEyebrow({ children }) {
  return (
    <span className="flex items-center gap-3 mb-5">
      <span className="w-6 h-px" style={{ background: ACCENT }} />
      <span className="font-body text-[11px] font-medium tracking-widest2 uppercase" style={{ color: ACCENT }}>
        {children}
      </span>
    </span>
  )
}

// ─── Floor Plan SVG ─────────────────────────────────────────────────────────────────────────────

function FloorPlan() { return <GhostDinnersFloorPlan /> }

// ─── Booking Form ─────────────────────────────────────────────────────────────

function BookingForm() {
  const [form, setForm]       = useState({ type: '', date: '', duration: '', name: '', email: '', phone: '', company: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]   = useState({})

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.type)  e.type  = 'Please select a booking type.'
    if (!form.date)  e.date  = 'Please choose a preferred date.'
    if (!form.name)  e.name  = 'Name is required.'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                     e.email = 'A valid email is required.'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSubmitted(true)
  }

  const inputBase =
    'w-full bg-compound-surface border px-4 py-3 font-body text-[0.9rem] text-compound-black placeholder:text-compound-concrete focus:outline-none transition-colors'
  const inputClass = (k) =>
    `${inputBase} ${errors[k] ? 'border-red-400' : 'border-compound-border'}`
  const focusStyle = { '--tw-ring-color': ACCENT }
  const labelClass = 'block font-body text-[11px] font-medium tracking-widest uppercase text-compound-steel mb-1.5'

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <span className="w-12 h-12 border-2 flex items-center justify-center" style={{ borderColor: ACCENT }}>
          <svg className="w-6 h-6" style={{ color: ACCENT }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3 className="font-display font-700 text-[1.5rem] text-compound-black">Inquiry Received</h3>
        <p className="font-body text-compound-steel max-w-sm">
          Thank you, {form.name}. The Ghost Dinners Kitchen team will review your request and respond within 24 hours at {form.email}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Booking type */}
      <div className="md:col-span-2">
        <label className={labelClass}>Type of Inquiry *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {['Brand Development', 'Recipe Testing', 'Content Shoot', 'Production Run', 'Kitchen Rental', 'Menu Development'].map(t => (
            <button
              key={t} type="button"
              onClick={() => set('type', t)}
              className="px-3 py-2.5 border text-[11px] font-body font-medium tracking-wider uppercase transition-colors text-left"
              style={form.type === t
                ? { borderColor: ACCENT, background: `${ACCENT}18`, color: ACCENT }
                : {}}
              data-inactive={form.type !== t || undefined}
            >
              <span className={form.type !== t ? 'text-compound-steel' : ''}>{t}</span>
            </button>
          ))}
        </div>
        {errors.type && <p className="mt-1.5 text-[12px] text-red-500">{errors.type}</p>}
      </div>

      {/* Date */}
      <div>
        <label htmlFor="gd-date" className={labelClass}>Preferred Date *</label>
        <input id="gd-date" type="date" value={form.date}
          onChange={e => set('date', e.target.value)}
          className={inputClass('date')}
          style={focusStyle}
        />
        {errors.date && <p className="mt-1.5 text-[12px] text-red-500">{errors.date}</p>}
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="gd-duration" className={labelClass}>Duration</label>
        <select id="gd-duration" value={form.duration}
          onChange={e => set('duration', e.target.value)}
          className={inputClass('duration') + ' cursor-pointer'}
        >
          <option value="">Select duration</option>
          {['Half-day (4 hrs)', 'Full day (8 hrs)', 'Multi-day (enquire)', 'Regular retainer'].map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="gd-name" className={labelClass}>Full Name *</label>
        <input id="gd-name" type="text" placeholder="Your name" value={form.name}
          onChange={e => set('name', e.target.value)}
          className={inputClass('name')}
        />
        {errors.name && <p className="mt-1.5 text-[12px] text-red-500">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="gd-email" className={labelClass}>Email Address *</label>
        <input id="gd-email" type="email" placeholder="you@example.com" value={form.email}
          onChange={e => set('email', e.target.value)}
          className={inputClass('email')}
        />
        {errors.email && <p className="mt-1.5 text-[12px] text-red-500">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="gd-phone" className={labelClass}>Phone Number</label>
        <input id="gd-phone" type="tel" placeholder="+971 __ ___ ____" value={form.phone}
          onChange={e => set('phone', e.target.value)}
          className={inputClass('phone')}
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="gd-company" className={labelClass}>Company / Brand</label>
        <input id="gd-company" type="text" placeholder="Your business or brand name" value={form.company}
          onChange={e => set('company', e.target.value)}
          className={inputClass('company')}
        />
      </div>

      {/* Notes */}
      <div className="md:col-span-2">
        <label htmlFor="gd-notes" className={labelClass}>Additional Notes</label>
        <textarea id="gd-notes" rows="4"
          placeholder="Tell us about your project, volume requirements, equipment needs, or any other details…"
          value={form.notes}
          onChange={e => set('notes', e.target.value)}
          className={inputClass('notes') + ' resize-none'}
        />
      </div>

      <div className="md:col-span-2 flex flex-wrap items-center gap-6">
        <button type="submit"
          className="inline-flex items-center gap-3 px-8 py-4 text-compound-white font-display font-600 text-[13px] tracking-widest uppercase transition-colors duration-200"
          style={{ background: ACCENT }}
          onMouseEnter={e => e.currentTarget.style.background = ACCENT_L}
          onMouseLeave={e => e.currentTarget.style.background = ACCENT}
        >
          Submit Inquiry
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <p className="font-body text-[12px] text-compound-concrete">We respond within 24 hours.</p>
      </div>
    </form>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GhostDinnersKitchen() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex flex-col justify-end overflow-hidden">
        {/* Hero photo */}
        <img
          src="/ghost-dinners-hero.png"
          alt="Ghost Dinners Development Kitchen — professional stainless steel kitchen with commercial range and content creation setup"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />
        {/* Accent vertical rule */}
        <div className="absolute top-0 right-32 w-px h-full opacity-15" style={{ background: ACCENT }} />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 lg:pb-24 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 text-[11px] font-body tracking-widest uppercase text-compound-white/60">
            <Link to="/" className="hover:text-compound-amber transition-colors">Home</Link>
            <span>/</span>
            <span className="cursor-pointer hover:text-compound-amber transition-colors">Spaces</span>
            <span>/</span>
            <span style={{ color: ACCENT }}>Ghost Dinners Kitchen</span>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px" style={{ background: ACCENT }} />
            <span className="font-body text-[11px] tracking-widest2 uppercase" style={{ color: ACCENT }}>
              Development Kitchen · The Compound, Dubai
            </span>
          </div>

          <h1 className="font-display font-800 text-compound-white leading-none tracking-tight mb-3 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}>
            Ghost Dinners
          </h1>
          <h1 className="font-display font-800 leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)', color: ACCENT }}>
            Development Kitchen
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <p className="font-body text-compound-white/75 text-[1.05rem] max-w-lg leading-relaxed">
              A fully-specced commercial kitchen built for brand development, recipe testing, high-volume production, and food content creation — the primary R&D engine of Ghost Dinners ME.
            </p>
            <a href="#book"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 text-compound-white font-display font-600 text-[11px] tracking-widest uppercase transition-colors"
              style={{ background: ACCENT }}
              onMouseEnter={e => e.currentTarget.style.background = ACCENT_L}
              onMouseLeave={e => e.currentTarget.style.background = ACCENT}
            >
              Request to Book
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            {[
              { v: '2,400', u: 'sq ft' },
              { v: '6',     u: 'Commercial Stations' },
              { v: '4',     u: 'Distinct Zones' },
              { v: '24/7',  u: 'Cold Storage' },
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
              Where Food Brands Are Built
            </h2>
            <div className="space-y-5 font-body text-compound-steel leading-relaxed text-[0.95rem] max-w-prose">
              <p>
                The Ghost Dinners Development Kitchen is the operational core of Ghost Dinners ME — the UAE-based food brand studio responsible for launching and scaling delivery-first dining concepts across the region. This is where new brands are born, tested, refined, and readied for market.
              </p>
              <p>
                The kitchen is built to commercial specification throughout: six heavy-duty cooking stations with full extraction, a triple-sink wash bay, commercial dishwasher, and a walk-in refrigeration and freezer vault capable of holding multi-day production volumes. Every detail of the fit-out is designed for professional repeatability — the same dish must come out the same way, every time.
              </p>
              <p>
                Adjacent to the main kitchen, a dedicated content studio handles the creative output: professional overhead lighting, configurable backdrops, and a shoot surface purpose-built for plated food photography and video production. Dishes move from the pass to the camera in under a minute.
              </p>
              <p>
                The dispatch and packaging zone closes the loop — packing stations, cold-bag staging, and a roller-door loading bay enable direct handoff to delivery partners or logistics providers without the product ever leaving a controlled environment.
              </p>
              <p>
                The kitchen is also available to Cucina Edit for overflow events and to vetted third-party operators for day and half-day hire. Enquiries from food startups, catering businesses, hotel F&B teams, and recipe developers are welcome.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="border border-compound-border p-6">
              <p className="font-display font-700 text-[11px] tracking-widest2 uppercase mb-5" style={{ color: ACCENT }}>
                At a Glance
              </p>
              <ul className="space-y-4">
                {[
                  ['Size',       '2,400 sq ft'],
                  ['Stations',   '6 commercial cooking stations'],
                  ['Cold',       'Walk-in fridge + freezer vault'],
                  ['Hire',       'Half-day / Full day / Retainer'],
                  ['Access',     "Via The Compound's rear service entrance"],
                  ['Primary',    'Ghost Dinners ME (R&D)'],
                  ['Also used',  'Cucina Edit + vetted third parties'],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-3">
                    <span className="font-body text-[11px] font-600 tracking-widest uppercase text-compound-concrete w-20 shrink-0 pt-0.5">{k}</span>
                    <span className="font-body text-[0.875rem] text-compound-black">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-compound-border p-6">
              <p className="font-display font-700 text-[11px] tracking-widest2 uppercase mb-5" style={{ color: ACCENT }}>
                Equipment Included
              </p>
              <ul className="space-y-2.5">
                {[
                  '6× commercial range / induction stations',
                  'Full extraction canopy system',
                  'Walk-in refrigerator (0°C)',
                  'Walk-in freezer vault (-18°C)',
                  'Triple-sink wash bay',
                  'Commercial pass-through dishwasher',
                  'Overhead photography lighting rig',
                  'Content studio backdrops',
                  'Packing & labelling stations',
                  'Roller-door loading bay access',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 mt-2 shrink-0" style={{ background: ACCENT }} />
                    <span className="font-body text-[0.875rem] text-compound-steel">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a href="#book"
              className="flex items-center justify-center gap-3 w-full py-4 text-compound-white font-display font-600 text-[12px] tracking-widest uppercase transition-colors"
              style={{ background: ACCENT }}
              onMouseEnter={e => e.currentTarget.style.background = ACCENT_L}
              onMouseLeave={e => e.currentTarget.style.background = ACCENT}
            >
              Request to Book This Space
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
              Illustrative layout — exact dimensions and fit-out details confirmed upon inquiry.
            </p>
          </div>

          <div className="bg-compound-white border border-compound-border p-4 lg:p-8 shadow-sm">
            <FloorPlan />
          </div>

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
          <SectionEyebrow>Photography</SectionEyebrow>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <h2 className="font-display font-800 leading-none tracking-tight text-compound-black"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
              The Space in Action
            </h2>
            <p className="font-body text-compound-steel text-[0.875rem] max-w-xs">
              Recipe development sessions, plating refinement, and tasting spreads — captured in the Ghost Dinners Kitchen.
            </p>
          </div>
          <div className="space-y-4">
            {/* Full-width development session — 16:9 */}
            <div className="group relative overflow-hidden aspect-[16/9]">
              <img src="/ghost-gallery-2.png" alt="Chefs working at multiple stations during a recipe development session in the Ghost Dinners Kitchen" className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-body text-[10px] tracking-widest2 uppercase mb-1" style={{ color: ACCENT }}>Ghost Dinners Kitchen</p>
                <p className="font-display font-700 text-compound-white text-[1.1rem]">Development Session</p>
                <p className="font-body text-compound-white/80 text-[0.82rem] mt-0.5">Three chefs working simultaneously across the six commercial stations</p>
              </div>
            </div>
            {/* Two 4:3 cards side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { src: '/ghost-gallery-1.png', alt: "Chef's hands plating a dish with tweezers on a stainless steel surface", label: 'Plating & Finishing', sub: "Tweezers, micro-herbs, stainless steel — the final pass" },
                { src: '/ghost-gallery-3.png', alt: 'Recipe development tasting spread laid out on stainless steel with numbered labels', label: 'Recipe Testing Spread', sub: 'Numbered portions, handwritten notes, iterative testing' },
              ].map(({ src, alt, label, sub }) => (
                <div key={label} className="group relative overflow-hidden aspect-[4/3]">
                  <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-body text-[10px] tracking-widest2 uppercase mb-1" style={{ color: ACCENT }}>Ghost Dinners Kitchen</p>
                    <p className="font-display font-700 text-compound-white text-[1rem]">{label}</p>
                    <p className="font-body text-compound-white/80 text-[0.8rem] mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="bg-compound-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionEyebrow>What It Is Used For</SectionEyebrow>
          <h2 className="font-display font-800 leading-none tracking-tight text-compound-white mb-14"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
            How People Use<br />This Kitchen
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="bg-compound-black p-8 flex flex-col gap-4 hover:bg-[#0d0d0b] transition-colors group">
                <div className="w-10 h-10 border flex items-center justify-center transition-colors"
                  style={{ borderColor: `${ACCENT}40`, color: ACCENT }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    {uc.icon}
                  </svg>
                </div>
                <h3 className="font-display font-700 text-[1rem] text-compound-white leading-snug">{uc.title}</h3>
                <p className="font-body text-[0.875rem] text-compound-white/40 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section id="book" className="bg-compound-surface py-20 lg:py-28 border-t border-compound-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">

            {/* Left: context */}
            <div>
              <SectionEyebrow>Reserve</SectionEyebrow>
              <h2 className="font-display font-800 leading-none tracking-tight text-compound-black mb-6"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                Request to Book<br />This Space
              </h2>
              <p className="font-body text-compound-steel text-[0.9rem] leading-relaxed mb-8">
                Submit your inquiry and the Ghost Dinners Kitchen team will confirm availability, share pricing, and send a full information pack within 24 hours.
              </p>
              <div className="space-y-4 font-body text-[0.875rem]">
                {[
                  ['Hire Periods', 'Half-day (4 hrs) · Full day (8 hrs)'],
                  ['Retainer',    'Weekly or monthly blocks available'],
                  ['Hours',       'Mon–Sat, 6:00am – 11:00pm'],
                  ['Min. Notice', '48 hours advance booking'],
                  ['Loading',     'Rear roller-door access included'],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 pb-4 border-b border-compound-border">
                    <span className="w-24 shrink-0 text-[11px] font-600 font-body tracking-widest uppercase text-compound-concrete pt-0.5">{k}</span>
                    <span className="text-compound-black">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-compound-white border border-compound-border p-8 lg:p-10">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER SPACES ── */}
      <section className="bg-compound-white py-16 border-t border-compound-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-body text-[11px] tracking-widest2 uppercase mb-1" style={{ color: ACCENT }}>Explore More</p>
            <p className="font-display font-700 text-[1.15rem] text-compound-black">Browse all spaces at The Compound</p>
          </div>
          <Link to="/#spaces"
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
