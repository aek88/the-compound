import { useState } from 'react'
import { Link } from 'react-router-dom'
import ServeoFloorPlan from '../components/floorplans/ServeoFloorPlan'

// ─── Design tokens ────────────────────────────────────────────────────────────
const ACCENT   = '#1d4e8a'
const ACCENT_L = '#2761a8'
const ACCENT_DIM = 'rgba(29,78,138,0.15)'

// ─── Data ────────────────────────────────────────────────────────────────────

const CAPACITY = [
  { value: '15',  label: 'Total Capacity',       sub: 'people across all areas' },
  { value: '10',  label: 'Open Plan Desks',       sub: 'hot-desk & assigned workstations' },
  { value: '8',   label: 'Meeting Room A',        sub: 'boardroom configuration' },
  { value: '4',   label: 'Meeting Room B',        sub: 'huddle & focus room' },
  { value: '5',   label: 'Private Suite',         sub: 'dedicated Serveo Group desks' },
  { value: '2',   label: 'Meeting Rooms',         sub: 'available for external hire' },
]

const FEATURES = [
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />,
    title: 'Open-Plan Workspace',
    description: 'Ten ergonomic workstations across a light-filled open floor, designed for focused individual work and easy team collaboration.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />,
    title: 'Private Office Suite',
    description: "Serveo Group's dedicated private area — five assigned desks, lockable storage, and acoustic separation from the open floor.",
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />,
    title: 'Boardroom — Meeting Room A',
    description: 'Seats eight in a formal boardroom layout. AV-equipped with wall-mounted display, video-conferencing camera, and whiteboard wall.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />,
    title: 'Huddle Room — Meeting Room B',
    description: 'An intimate four-person room for focused discussions, client calls, and quick internal syncs — bookable by the hour.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    title: 'External Meeting Room Hire',
    description: 'Both meeting rooms are available for hire by external businesses — by the hour or half-day. Ideal for off-site meetings, interviews, or client presentations.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />,
    title: 'Full Tech Infrastructure',
    description: 'Enterprise-grade Wi-Fi throughout, wired Ethernet at every desk, HDMI and USB-C connections at meeting rooms, and secure access control.',
  },
]

const GALLERY_IMAGES = [
  {
    label: 'Open Plan',
    gradient: 'linear-gradient(145deg, #0a0f18 0%, #101828 40%, #162035 70%, #1c2a42 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v32H0zM31 0h1v32h-1zM0 0v1h32V0zM0 31v1h32v-1z' fill='%23fff' opacity='0.06'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Light-filled open-plan with 10 workstations',
  },
  {
    label: 'Boardroom',
    gradient: 'linear-gradient(135deg, #080e1a 0%, #0e1a30 45%, #142240 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20L20 0' stroke='%23ffffff' stroke-width='0.4' opacity='0.07'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Meeting Room A — 8-seat boardroom configuration',
  },
  {
    label: 'Private Suite',
    gradient: 'linear-gradient(160deg, #0c1220 0%, #121c32 50%, #182438 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ffffff' opacity='0.08'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: "Serveo Group's dedicated private office area",
  },
  {
    label: 'Breakout',
    gradient: 'linear-gradient(135deg, #0e1825 0%, #162030 45%, #1c2a3c 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l20 10L40 0' fill='none' stroke='%23fff' stroke-width='0.4' opacity='0.07'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Lounge and informal collaboration zone',
  },
]

const FLOOR_ZONES = [
  { color: '#1d4e8a', label: 'Open Plan Workspace',   sub: '10 Workstations' },
  { color: '#0f2d52', label: 'Private Office Suite',   sub: 'Serveo Group — 5 desks' },
  { color: '#162840', label: 'Meeting Room A',          sub: 'Boardroom — 8 people' },
  { color: '#1a3050', label: 'Meeting Room B',          sub: 'Huddle Room — 4 people' },
  { color: '#2a3040', label: 'Breakout & Lounge',       sub: 'Informal Collaboration' },
  { color: '#1e2530', label: 'Reception & Entry',       sub: 'Shared Entry from Cafe' },
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

function FloorPlan() { return <ServeoFloorPlan /> }

// ─── Inquiry Form ─────────────────────────────────────────────────────────────

function InquiryForm() {
  const [form, setForm]   = useState({ type: '', date: '', duration: '', name: '', email: '', phone: '', company: '', team: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]       = useState({})

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.type)  e.type  = 'Please select an inquiry type.'
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

  const inputClass = (k) =>
    `w-full bg-compound-surface border px-4 py-3 font-body text-[0.9rem] text-compound-black placeholder:text-compound-concrete focus:outline-none transition-colors ${errors[k] ? 'border-red-400' : 'border-compound-border'}`
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
          Thank you, {form.name}. The Serveo team will be in touch within one business day at {form.email}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Inquiry type */}
      <div className="md:col-span-2">
        <label className={labelClass}>Type of Inquiry *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {['Office Tour', 'Meeting Room — Half Day', 'Meeting Room — Full Day', 'Hot-desk / Day Pass', 'Monthly Retainer', 'Custom Requirement'].map(t => (
            <button key={t} type="button" onClick={() => set('type', t)}
              className="px-3 py-2.5 border text-[11px] font-body font-medium tracking-wider uppercase transition-colors text-left"
              style={form.type === t ? { borderColor: ACCENT, background: ACCENT_DIM, color: ACCENT } : {}}
            >
              <span className={form.type !== t ? 'text-compound-steel' : ''}>{t}</span>
            </button>
          ))}
        </div>
        {errors.type && <p className="mt-1.5 text-[12px] text-red-500">{errors.type}</p>}
      </div>

      {/* Preferred date */}
      <div>
        <label htmlFor="so-date" className={labelClass}>Preferred Date</label>
        <input id="so-date" type="date" value={form.date}
          onChange={e => set('date', e.target.value)}
          className={inputClass('date')}
        />
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="so-duration" className={labelClass}>Duration / Commitment</label>
        <select id="so-duration" value={form.duration}
          onChange={e => set('duration', e.target.value)}
          className={inputClass('duration') + ' cursor-pointer'}
        >
          <option value="">Select an option</option>
          {['One-off / Day', 'Weekly', 'Monthly', '3–6 Months', '6–12 Months', "Long-term (12+ months)"].map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="so-name" className={labelClass}>Full Name *</label>
        <input id="so-name" type="text" placeholder="Your name" value={form.name}
          onChange={e => set('name', e.target.value)}
          className={inputClass('name')}
        />
        {errors.name && <p className="mt-1.5 text-[12px] text-red-500">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="so-email" className={labelClass}>Email Address *</label>
        <input id="so-email" type="email" placeholder="you@example.com" value={form.email}
          onChange={e => set('email', e.target.value)}
          className={inputClass('email')}
        />
        {errors.email && <p className="mt-1.5 text-[12px] text-red-500">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="so-phone" className={labelClass}>Phone Number</label>
        <input id="so-phone" type="tel" placeholder="+971 __ ___ ____" value={form.phone}
          onChange={e => set('phone', e.target.value)}
          className={inputClass('phone')}
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="so-company" className={labelClass}>Company / Organisation</label>
        <input id="so-company" type="text" placeholder="Your company name" value={form.company}
          onChange={e => set('company', e.target.value)}
          className={inputClass('company')}
        />
      </div>

      {/* Team size */}
      <div className="md:col-span-2">
        <label htmlFor="so-team" className={labelClass}>Team Size</label>
        <select id="so-team" value={form.team}
          onChange={e => set('team', e.target.value)}
          className={inputClass('team') + ' cursor-pointer'}
        >
          <option value="">Select team size</option>
          {['1 person', '2–4 people', '5–8 people', '9–12 people', '13–15 people'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div className="md:col-span-2">
        <label htmlFor="so-notes" className={labelClass}>Additional Notes</label>
        <textarea id="so-notes" rows="4"
          placeholder="Tell us about your requirements, preferred layout, AV needs, or any other details…"
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
        <p className="font-body text-[12px] text-compound-concrete">We respond within one business day.</p>
      </div>
    </form>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServeoOffices() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(155deg, #050810 0%, #0a1020 30%, #0f1830 55%, #142040 78%, #182848 100%)',
        }}>
          {/* Grid blueprint texture */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
          {/* Ghost watermark */}
          <div className="absolute inset-0 flex items-center justify-end pr-8 overflow-hidden select-none" aria-hidden>
            <span className="font-display font-800 leading-none tracking-tight uppercase"
              style={{ fontSize: '16vw', color: 'rgba(29,78,138,0.08)' }}>
              SERVEO
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Vertical accent rule */}
          <div className="absolute top-0 left-20 w-px h-full opacity-20" style={{ background: ACCENT }} />
          {/* Ambient glow */}
          <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full blur-[120px] opacity-10"
            style={{ background: ACCENT }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 lg:pb-24 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 text-[11px] font-body tracking-widest uppercase text-compound-white/40">
            <Link to="/" className="hover:text-compound-amber transition-colors">Home</Link>
            <span>/</span>
            <span className="cursor-pointer hover:text-compound-amber transition-colors">Spaces</span>
            <span>/</span>
            <span style={{ color: ACCENT }}>Serveo Offices</span>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px" style={{ background: ACCENT }} />
            <span className="font-body text-[11px] tracking-widest2 uppercase" style={{ color: ACCENT }}>
              Professional Office Space · The Compound, Dubai
            </span>
          </div>

          <h1 className="font-display font-800 text-compound-white leading-none tracking-tight mb-3"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}>
            Serveo Group
          </h1>
          <h1 className="font-display font-800 leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)', color: ACCENT }}>
            Offices
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <p className="font-body text-compound-white/55 text-[1.05rem] max-w-lg leading-relaxed">
              Purpose-built open-plan office space with private suites, boardroom, and huddle rooms — home to Serveo Group, with meeting rooms and desks available for external hire.
            </p>
            <a href="#inquire"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 text-compound-white font-display font-600 text-[11px] tracking-widest uppercase transition-colors"
              style={{ background: ACCENT }}
              onMouseEnter={e => e.currentTarget.style.background = ACCENT_L}
              onMouseLeave={e => e.currentTarget.style.background = ACCENT}
            >
              Inquire About Office Space
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            {[
              { v: '15',  u: 'People' },
              { v: '10',  u: 'Workstations' },
              { v: '2',   u: 'Meeting Rooms' },
              { v: '1',   u: 'Private Suite' },
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

          <div>
            <SectionEyebrow>About The Space</SectionEyebrow>
            <h2 className="font-display font-800 leading-none tracking-tight text-compound-black mb-8"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
              A Serious Address<br />Inside The Compound
            </h2>
            <div className="space-y-5 font-body text-compound-steel leading-relaxed text-[0.95rem] max-w-prose">
              <p>
                The Serveo Group Offices occupy a purpose-built floor within The Compound — open-plan, thoughtfully designed, and built to the standard that a growing professional services business demands. It is the permanent base for the Serveo Group team, housing up to fifteen people across a mix of assigned and flexible workstations.
              </p>
              <p>
                The open plan spans ten workstations arranged for both focused individual work and spontaneous team collaboration, with a shared display wall for presentations and stand-ups. Natural light from the warehouse-height windows floods the space without the sterility of a conventional corporate fitout — the raw concrete columns and steel detailing of The Compound remain visible throughout.
              </p>
              <p>
                Adjacent to the open floor, a private office suite provides five dedicated desks for the Serveo core team — acoustically separated, with lockable storage and a direct view across the workspace.
              </p>
              <p>
                Two meeting rooms serve the wider office. Meeting Room A is a full boardroom for eight, equipped with AV, video conferencing, and a whiteboard wall. Meeting Room B is a four-person huddle room suited for focused calls and quick syncs. Both rooms are available for hire by external businesses — by the hour, half-day, or full day — through The Compound.
              </p>
              <p>
                The space connects directly to The Compound Cafe, giving the team immediate access to specialty coffee, casual meeting space, and the broader community of businesses operating under this roof.
              </p>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="border border-compound-border p-6">
              <p className="font-display font-700 text-[11px] tracking-widest2 uppercase mb-5" style={{ color: ACCENT }}>
                At a Glance
              </p>
              <ul className="space-y-4">
                {[
                  ['Total',        'Up to 15 people'],
                  ['Open Plan',    '10 workstations (hot-desk + assigned)'],
                  ['Private',      '5 dedicated desks — Serveo Group'],
                  ['Meeting A',    '8 people · Boardroom · AV'],
                  ['Meeting B',    '4 people · Huddle Room'],
                  ['For Hire',     'Both meeting rooms + overflow desks'],
                  ['Access',       'Via The Compound Cafe reception'],
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
                Available for External Hire
              </p>
              <ul className="space-y-2.5">
                {[
                  'Meeting Room A — hourly / half-day / full day',
                  'Meeting Room B — hourly / half-day',
                  'Hot-desks — day passes available',
                  'AV & video conferencing included',
                  'Cafe access for all guests',
                  'Secure Wi-Fi & printing',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 mt-2 shrink-0" style={{ background: ACCENT }} />
                    <span className="font-body text-[0.875rem] text-compound-steel">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a href="#inquire"
              className="flex items-center justify-center gap-3 w-full py-4 text-compound-white font-display font-600 text-[12px] tracking-widest uppercase transition-colors"
              style={{ background: ACCENT }}
              onMouseEnter={e => e.currentTarget.style.background = ACCENT_L}
              onMouseLeave={e => e.currentTarget.style.background = ACCENT}
            >
              Inquire About Office Space
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
              Illustrative layout — exact configuration confirmed upon inquiry.
            </p>
          </div>

          <div className="bg-compound-white border border-compound-border p-4 lg:p-8 shadow-sm">
            <FloorPlan />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            {FLOOR_ZONES.map(({ color, label, sub }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="w-3 h-3 shrink-0 mt-1" style={{ background: color, opacity: 0.8 }} />
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
            {GALLERY_IMAGES.map((img) => (
              <div key={img.label} className="group relative overflow-hidden">
                <div className={`relative w-full ${img.aspect} overflow-hidden`} style={{ background: img.gradient }}>
                  <div className="absolute inset-0" style={{ backgroundImage: img.pattern, backgroundSize: '40px 40px' }} />
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden>
                    <span className="font-display font-800 leading-none tracking-tight uppercase"
                      style={{ fontSize: 'clamp(4rem,8vw,7rem)', color: `${ACCENT}12` }}>
                      {img.label}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-body text-[10px] tracking-widest2 uppercase mb-1" style={{ color: ACCENT }}>
                      Serveo Offices
                    </p>
                    <p className="font-display font-700 text-compound-white text-[1.05rem]">{img.label}</p>
                    <p className="font-body text-compound-white/60 text-[0.8rem] mt-0.5">{img.sub}</p>
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
            Space Breakdown
          </h2>

          {/* Capacity numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 mb-px">
            {CAPACITY.map(({ value, label, sub }) => (
              <div key={label} className="bg-compound-black px-6 py-8 flex flex-col gap-2">
                <p className="font-display font-800 text-[2.5rem] leading-none" style={{ color: ACCENT }}>
                  {value}
                </p>
                <p className="font-display font-600 text-[0.8rem] text-compound-white leading-snug">{label}</p>
                <p className="font-body text-[0.75rem] text-compound-white/30 leading-snug">{sub}</p>
              </div>
            ))}
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 mt-px">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-compound-black p-8 flex flex-col gap-4 hover:bg-[#0d0d0b] transition-colors group">
                <div className="w-10 h-10 border flex items-center justify-center transition-colors"
                  style={{ borderColor: `${ACCENT}40`, color: ACCENT }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="font-display font-700 text-[1rem] text-compound-white leading-snug">{f.title}</h3>
                <p className="font-body text-[0.875rem] text-compound-white/40 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="inquire" className="bg-compound-surface py-20 lg:py-28 border-t border-compound-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">

            <div>
              <SectionEyebrow>Get In Touch</SectionEyebrow>
              <h2 className="font-display font-800 leading-none tracking-tight text-compound-black mb-6"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                Inquire About<br />Office Space
              </h2>
              <p className="font-body text-compound-steel text-[0.9rem] leading-relaxed mb-8">
                Whether you need a meeting room for the afternoon or a permanent desk in a serious office environment, get in touch and the Serveo team will respond within one business day.
              </p>
              <div className="space-y-4 font-body text-[0.875rem]">
                {[
                  ['Meeting Rooms', 'Hourly · Half-day · Full day'],
                  ['Hot-desks',     'Day passes available'],
                  ['Retainer',      'Monthly desk packages'],
                  ['Hours',         'Sun–Thu, 8:00am – 7:00pm'],
                  ['Access',        'Via The Compound Cafe'],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 pb-4 border-b border-compound-border">
                    <span className="w-28 shrink-0 text-[11px] font-600 font-body tracking-widest uppercase text-compound-concrete pt-0.5">{k}</span>
                    <span className="text-compound-black">{v}</span>
                  </div>
                ))}
              </div>
            </div>

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
