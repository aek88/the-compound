import { useState } from 'react'
import { Link } from 'react-router-dom'
import CucinaFloorPlan from '../components/floorplans/CucinaFloorPlan'

// ─── Data ────────────────────────────────────────────────────────────────────

const USE_CASES = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
    ),
    title: 'Pasta-Making Workshops',
    description: 'Hands-on classes for up to 12 participants at dedicated pasta stations with marble rolling surfaces and drying racks.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.3 24.3 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.15.066A2.25 2.25 0 0118 13.5v1.5M14.25 3.104c.251.023.501.05.75.082M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm7.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm7.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    ),
    title: 'Culinary Masterclasses',
    description: 'Professional demonstrations and structured cooking courses — from knife skills sessions to multi-course Italian technique intensives.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    ),
    title: 'Food Content Creation',
    description: 'Dedicated photography corner with natural overhead light, a white-washed brick backdrop, and styling surfaces for recipe shoots and brand campaigns.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    ),
    title: 'Private Dining Events',
    description: "Intimate chef's table dinners for up to 10 guests around the tasting table — ideal for brand activations, press events, or client entertainment.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    title: 'Recipe Development & Testing',
    description: 'Full-day hire for food professionals needing a pristine, fully-stocked kitchen to develop, test, and document new dishes or product lines.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75z" />
    ),
    title: 'Corporate Team Experiences',
    description: 'Bespoke catering and group cooking experiences for corporate teams — a memorable alternative to the standard office event.',
  },
]

const GALLERY_IMAGES = [
  {
    label: 'Main Workshop',
    gradient: 'linear-gradient(145deg, #2a1505 0%, #5c2e0a 45%, #8c4b1a 80%, #b06830 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23fff' stroke-width='0.3' opacity='0.07'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Pasta stations with marble countertops',
  },
  {
    label: 'Tasting Table',
    gradient: 'linear-gradient(135deg, #1a0e05 0%, #3d2210 50%, #6b4020 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20L20 0' stroke='%23ffffff' stroke-width='0.4' opacity='0.08'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Private dining for up to 10 guests',
  },
  {
    label: 'Content Corner',
    gradient: 'linear-gradient(160deg, #0d1117 0%, #1a2030 50%, #253040 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Photography & video production setup',
  },
  {
    label: 'Prep Counter',
    gradient: 'linear-gradient(135deg, #1c1008 0%, #3a2410 45%, #5c3e20 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l20 10L40 0' fill='none' stroke='%23fff' stroke-width='0.4' opacity='0.08'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Professional plating and finishing station',
  },
]

const FLOOR_ZONES = [
  { color: '#c47a3a', label: 'Main Workshop', sub: '6 Pasta Stations' },
  { color: '#1e3554', label: 'Content Creation', sub: 'Photography Corner' },
  { color: '#4a3520', label: 'Tasting Table', sub: 'Private Dining' },
  { color: '#2a2a28', label: 'Prep & Plating', sub: 'Counter Space' },
  { color: '#5c3e20', label: 'Storage & Pantry', sub: 'Ingredients + Equipment' },
  { color: '#3a3a38', label: 'Wash Station', sub: 'Dual-bay sink' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function Icon({ children }) {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      {children}
    </svg>
  )
}

function SectionEyebrow({ children }) {
  return (
    <span className="flex items-center gap-3 mb-5">
      <span className="w-6 h-px bg-compound-amber" />
      <span className="font-body text-[11px] font-medium tracking-widest2 uppercase text-compound-amber">
        {children}
      </span>
    </span>
  )
}

// ─── Floor Plan SVG ─────────────────────────────────────────────────────────────────────────────

function FloorPlan() { return <CucinaFloorPlan /> }

// ─── Booking Form ─────────────────────────────────────────────────────────────

function BookingForm() {
  const [form, setForm] = useState({
    type: '', date: '', guests: '', name: '', email: '', phone: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]       = useState({})

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.type)    e.type    = 'Please select a booking type.'
    if (!form.date)    e.date    = 'Please choose a preferred date.'
    if (!form.name)    e.name    = 'Name is required.'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                       e.email   = 'A valid email is required.'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSubmitted(true)
  }

  const inputClass = (k) =>
    `w-full bg-compound-surface border px-4 py-3 font-body text-[0.9rem] text-compound-black
     placeholder:text-compound-concrete focus:outline-none focus:border-compound-amber transition-colors
     ${errors[k] ? 'border-red-400' : 'border-compound-border'}`

  const labelClass = 'block font-body text-[11px] font-medium tracking-widest uppercase text-compound-steel mb-1.5'

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <span className="w-12 h-12 border-2 border-compound-amber flex items-center justify-center">
          <svg className="w-6 h-6 text-compound-amber" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3 className="font-display font-700 text-[1.5rem] text-compound-black">Request Received</h3>
        <p className="font-body text-compound-steel max-w-sm">
          Thank you, {form.name}. Our team will review your request and get back to you within 24 hours at {form.email}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Booking type */}
      <div className="md:col-span-2">
        <label className={labelClass}>Type of Booking *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {['Pasta Workshop', 'Culinary Class', 'Content Shoot', 'Private Dinner', 'Recipe Development', 'Corporate Event'].map(t => (
            <button
              key={t} type="button"
              onClick={() => set('type', t)}
              className={`px-3 py-2.5 border text-[11px] font-body font-medium tracking-wider uppercase transition-colors text-left
                ${form.type === t
                  ? 'border-compound-amber bg-compound-amber/10 text-compound-amber'
                  : 'border-compound-border text-compound-steel hover:border-compound-concrete'}`}
            >
              {t}
            </button>
          ))}
        </div>
        {errors.type && <p className="mt-1.5 text-[12px] text-red-500">{errors.type}</p>}
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className={labelClass}>Preferred Date *</label>
        <input
          id="date" type="date" value={form.date}
          onChange={e => set('date', e.target.value)}
          className={inputClass('date')}
        />
        {errors.date && <p className="mt-1.5 text-[12px] text-red-500">{errors.date}</p>}
      </div>

      {/* Guests */}
      <div>
        <label htmlFor="guests" className={labelClass}>Number of Guests</label>
        <select
          id="guests" value={form.guests}
          onChange={e => set('guests', e.target.value)}
          className={inputClass('guests') + ' cursor-pointer'}
        >
          <option value="">Select group size</option>
          {['1–4', '5–8', '9–12', '13+'].map(g => <option key={g} value={g}>{g} people</option>)}
        </select>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="bname" className={labelClass}>Full Name *</label>
        <input
          id="bname" type="text" placeholder="Your name" value={form.name}
          onChange={e => set('name', e.target.value)}
          className={inputClass('name')}
        />
        {errors.name && <p className="mt-1.5 text-[12px] text-red-500">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="bemail" className={labelClass}>Email Address *</label>
        <input
          id="bemail" type="email" placeholder="you@example.com" value={form.email}
          onChange={e => set('email', e.target.value)}
          className={inputClass('email')}
        />
        {errors.email && <p className="mt-1.5 text-[12px] text-red-500">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div className="md:col-span-2">
        <label htmlFor="phone" className={labelClass}>Phone Number</label>
        <input
          id="phone" type="tel" placeholder="+971 __ ___ ____" value={form.phone}
          onChange={e => set('phone', e.target.value)}
          className={inputClass('phone')}
        />
      </div>

      {/* Notes */}
      <div className="md:col-span-2">
        <label htmlFor="notes" className={labelClass}>Additional Notes</label>
        <textarea
          id="notes" rows="4"
          placeholder="Tell us about your event, any dietary requirements, equipment needs, or questions…"
          value={form.notes}
          onChange={e => set('notes', e.target.value)}
          className={inputClass('notes') + ' resize-none'}
        />
      </div>

      <div className="md:col-span-2 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          className="inline-flex items-center gap-3 px-8 py-4 bg-compound-amber text-compound-white font-display font-600 text-[13px] tracking-widest uppercase hover:bg-compound-amber-light transition-colors duration-200"
        >
          Submit Request
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

export default function CucinaEdit() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex flex-col justify-end overflow-hidden">
        {/* Hero photo */}
        <img
          src="/cucina-edit-hero.png"
          alt="Cucina Edit — industrial cooking workshop with marble island and pasta station"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />
        {/* Left amber rule */}
        <div className="absolute top-0 left-24 w-px h-full bg-compound-amber opacity-20" />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 lg:pb-24 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 text-[11px] font-body tracking-widest uppercase text-compound-white/60">
            <Link to="/" className="hover:text-compound-amber transition-colors">Home</Link>
            <span>/</span>
            <span className="hover:text-compound-amber transition-colors cursor-pointer">Spaces</span>
            <span>/</span>
            <span className="text-compound-amber">Cucina Edit</span>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-compound-amber" />
            <span className="font-body text-[11px] tracking-widest2 uppercase text-compound-amber">
              Culinary Workshop · The Compound, Dubai
            </span>
          </div>

          <h1 className="font-display font-800 text-compound-white leading-none tracking-tight mb-6 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            Cucina Edit
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <p className="font-body text-compound-white/80 text-[1.05rem] max-w-lg leading-relaxed">
              A refined culinary studio built for pasta-making workshops, cooking
              classes, food content creation, and private dining experiences.
            </p>
            <a
              href="#book"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-compound-amber text-compound-white font-display font-600 text-[11px] tracking-widest uppercase hover:bg-compound-amber-light transition-colors"
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
              { v: '1,200', u: 'sq ft' },
              { v: '12',    u: 'Workshop Capacity' },
              { v: '6',     u: 'Pasta Stations' },
              { v: '3',     u: 'Distinct Zones' },
            ].map(({ v, u }) => (
              <div key={u}>
                <p className="font-display font-800 text-compound-white text-[1.8rem] leading-none">
                  {v}<span className="text-compound-amber text-[1rem] ml-1">{u}</span>
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
              Where Craft Meets Kitchen
            </h2>
            <div className="space-y-5 font-body text-compound-steel leading-relaxed text-[0.95rem] max-w-prose">
              <p>
                Cucina Edit is The Compound's dedicated culinary studio — a space designed from the ground up for food professionals, enthusiasts, and content creators who need more than a domestic kitchen but don't want the sterility of a commercial commissary.
              </p>
              <p>
                Six marble-topped pasta stations sit at the heart of the workshop, each fully outfitted with hand-cranked and electric pasta machines, drying racks, and mise en place trays. The layout is optimised for group learning: every participant has clear sightlines to the chef's demonstration counter, and stations are spaced generously enough to work without crowding.
              </p>
              <p>
                Adjacent to the main workshop, the content creation corner features a white-washed brick feature wall, overhead natural-light diffusers, and a flat lay shooting surface — everything a food photographer or video creator needs without bringing a single piece of equipment.
              </p>
              <p>
                The tasting table seats up to ten guests for sit-down experiences, private dinners, or end-of-workshop tastings — transitioning the space from classroom to dining room in minutes. Cucina Edit is booked by the half-day or full day, with optional kitchen concierge support.
              </p>
            </div>
          </div>

          {/* Sidebar: at-a-glance */}
          <aside className="space-y-8">
            <div className="border border-compound-border p-6">
              <p className="font-display font-700 text-[11px] tracking-widest2 uppercase text-compound-amber mb-5">
                At a Glance
              </p>
              <ul className="space-y-4">
                {[
                  ['Size',        '1,200 sq ft'],
                  ['Capacity',    'Up to 12 (workshop) · 10 (dining)'],
                  ['Hire',        'Half-day / Full day / Multi-day'],
                  ['Access',      'Private entry from The Compound Cafe'],
                  ['Support',     'Kitchen concierge available'],
                  ['Equipment',   'Fully stocked — see below'],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-3">
                    <span className="font-body text-[11px] font-600 tracking-widest uppercase text-compound-concrete w-20 shrink-0 pt-0.5">{k}</span>
                    <span className="font-body text-[0.875rem] text-compound-black">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-compound-border p-6">
              <p className="font-display font-700 text-[11px] tracking-widest2 uppercase text-compound-amber mb-5">
                Equipment Included
              </p>
              <ul className="space-y-2.5">
                {[
                  'Electric & hand-cranked pasta machines',
                  'Marble rolling surfaces (×6)',
                  'Commercial induction hobs',
                  'Overhead lighting rig',
                  'Photography backdrops',
                  'Full crockery & serving ware',
                  'Mise en place trays & tools',
                  'Drying racks & pasta boards',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 bg-compound-amber mt-2 shrink-0" />
                    <span className="font-body text-[0.875rem] text-compound-steel">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#book"
              className="flex items-center justify-center gap-3 w-full py-4 bg-compound-amber text-compound-white font-display font-600 text-[12px] tracking-widest uppercase hover:bg-compound-amber-light transition-colors"
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
              Illustrative layout — exact dimensions and fit-out confirmed upon booking enquiry.
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
          <SectionEyebrow>Photography</SectionEyebrow>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <h2 className="font-display font-800 leading-none tracking-tight text-compound-black"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
              The Space in Action
            </h2>
            <p className="font-body text-compound-steel text-[0.875rem] max-w-xs">
              Pasta-making, group classes, and finished dishes — all in the Cucina Edit studio.
            </p>
          </div>

          {/* Editorial gallery: full-width class shot + two detail cards */}
          <div className="space-y-4">
            {/* Group class — full width */}
            <div className="group relative overflow-hidden aspect-[16/9]">
              <img
                src="/cucina-gallery-2.png"
                alt="Group cooking class in session around the marble island at Cucina Edit"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-body text-[10px] tracking-widest2 uppercase text-compound-amber mb-1">Cucina Edit</p>
                <p className="font-display font-700 text-compound-white text-[1.1rem]">Group Cooking Class</p>
                <p className="font-body text-compound-white/80 text-[0.82rem] mt-0.5">Up to 12 participants around the marble island</p>
              </div>
            </div>

            {/* Two detail shots side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  src: '/cucina-gallery-1.png',
                  alt: 'Fresh pasta being rolled through a bronze pasta machine on marble',
                  label: 'Pasta Making',
                  sub: 'Bronze machine, Carrara marble, Edison backdrop',
                },
                {
                  src: '/cucina-gallery-3.png',
                  alt: 'Styled finished dishes — truffle tagliatelle, burrata and tiramisu on marble',
                  label: 'Finished Dishes',
                  sub: 'Truffle tagliatelle · burrata · tiramisu',
                },
              ].map(({ src, alt, label, sub }) => (
                <div key={label} className="group relative overflow-hidden aspect-[4/3]">
                  <img
                    src={src}
                    alt={alt}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-body text-[10px] tracking-widest2 uppercase text-compound-amber mb-1">Cucina Edit</p>
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
          <SectionEyebrow>What It's Used For</SectionEyebrow>
          <h2 className="font-display font-800 leading-none tracking-tight text-compound-white mb-14"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
            How People Use<br />Cucina Edit
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="bg-compound-black p-8 flex flex-col gap-4 hover:bg-[#111] transition-colors group">
                <div className="w-10 h-10 border border-compound-amber/30 flex items-center justify-center text-compound-amber group-hover:border-compound-amber transition-colors">
                  <Icon>{uc.icon}</Icon>
                </div>
                <h3 className="font-display font-700 text-[1rem] text-compound-white leading-snug">
                  {uc.title}
                </h3>
                <p className="font-body text-[0.875rem] text-compound-white/40 leading-relaxed">
                  {uc.description}
                </p>
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
                Fill in the form and a member of The Compound team will confirm availability and send you a full information pack within 24 hours.
              </p>
              <div className="space-y-4 font-body text-[0.875rem]">
                {[
                  ['Hire Periods', 'Half-day (4 hrs) · Full day (8 hrs)'],
                  ['Availability', 'Mon–Sat, 7:00am – 10:00pm'],
                  ['Min. Notice',  '48 hours advance booking'],
                  ['Catering',    'BYO or arrange via Compound Cafe'],
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
            <p className="font-body text-[11px] tracking-widest2 uppercase text-compound-amber mb-1">Explore More</p>
            <p className="font-display font-700 text-[1.15rem] text-compound-black">Browse all spaces at The Compound</p>
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
