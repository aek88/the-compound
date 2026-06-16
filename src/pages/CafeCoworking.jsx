import { Link } from 'react-router-dom'

// ─── Design tokens ────────────────────────────────────────────────────────────
const ACCENT     = '#5c7a42'
const ACCENT_L   = '#71944f'
const ACCENT_DIM = 'rgba(92,122,66,0.15)'

// ─── Data ────────────────────────────────────────────────────────────────────

const AMENITIES = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    ),
    title: 'Enterprise-Grade Wi-Fi',
    description: '1 Gbps symmetric fibre throughout the space, with private SSIDs available to members. Engineered for video calls, large file transfers, and simultaneous heavy use.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    ),
    title: 'USB-C & USB-A Charging at Every Seat',
    description: "Integrated charging ports are built into every desk, counter, and lounge table — no adapter hunting, no hunting for a wall socket. Power where you actually sit.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    title: 'Open 7 Days, 7am – 10pm',
    description: "Early starts and late finishes are both covered. The Cafe is open every day of the week — including weekends — with the same full menu and facilities throughout.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
    ),
    title: 'Specialty Coffee Bar',
    description: 'A full espresso bar serving single-origin filter, espresso-based drinks, and seasonal specials — sourced and prepared with the same attention to craft as the rest of The Compound.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    ),
    title: 'Fresh Food Menu',
    description: 'A rotating selection of breakfast, light lunch, and all-day snacks — designed to sustain a full working day. Seasonal ingredients, no heat-lamp food, no sad office sandwiches.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    ),
    title: 'Natural Light Throughout',
    description: 'The central atrium is designed around natural light — skylights, full-height glazing on two sides, and a daylighting layout that means no one is stuck under fluorescent tubes in the back corner.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
    ),
    title: 'Indoor Greenery & Biophilic Design',
    description: 'Planting is structural — not decorative afterthought. Trees, trailing plants, and moss walls run through the entire space, improving air quality and creating genuine visual separation between zones.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    ),
    title: 'Flexible Seating Zones',
    description: 'High-focus desk rows for deep work, lounge clusters for informal meetings, bar-height counters for quick calls, and booth seating for longer collaborations — all in the same open floor.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    ),
    title: 'Compound-Wide Community',
    description: 'Shared infrastructure — the Cafe connects directly to Cucina Edit, the Ghost Dinners kitchen, the Serveo offices, and the Automotive Vault. Members cross paths with chefs, car collectors, brand founders, and remote workers daily.',
  },
]

const GALLERY_IMAGES = [
  {
    label: 'The Atrium',
    gradient: 'linear-gradient(155deg, #0d1208 0%, #1a2010 35%, #263018 65%, #324028 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23ffffff' opacity='0.07'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[16/9]',
    sub: 'Central atrium with full-height glazing and planted dividers',
  },
  {
    label: 'Coffee Bar',
    gradient: 'linear-gradient(135deg, #100c04 0%, #241808 45%, #382a14 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20L20 0' stroke='%23ffffff' stroke-width='0.4' opacity='0.06'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Specialty espresso bar with single-origin filter',
  },
  {
    label: 'Work Desks',
    gradient: 'linear-gradient(145deg, #0a1008 0%, #121a0e 40%, #1a2418 70%, #243020 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v32H0zM31 0h1v32h-1zM0 0v1h32V0zM0 31v1h32v-1z' fill='%23fff' opacity='0.05'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Hot-desk rows with integrated USB-C charging at every seat',
  },
  {
    label: 'Lounge Zone',
    gradient: 'linear-gradient(135deg, #0e1408 0%, #1a2010 45%, #283018 100%)',
    pattern: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 24L24 0M12 24L24 12M0 12L12 0' stroke='%23fff' stroke-width='0.35' opacity='0.06'/%3E%3C/svg%3E")`,
    aspect: 'aspect-[4/3]',
    sub: 'Soft-seating lounge clusters for informal meetings',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionEyebrow({ children, light = false }) {
  return (
    <span className="flex items-center gap-3 mb-5">
      <span className="w-6 h-px" style={{ background: light ? ACCENT_L : ACCENT }} />
      <span className="font-body text-[11px] font-medium tracking-widest2 uppercase"
        style={{ color: light ? ACCENT_L : ACCENT }}>
        {children}
      </span>
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CafeCoworking() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(155deg, #0c1208 0%, #1a2010 30%, #263020 55%, #334030 78%, #405040 100%)',
        }}>
          {/* Organic leaf-vein pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0 Q60 20 40 40 Q20 60 40 80' fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.05'/%3E%3Cpath d='M0 40 Q20 20 40 40 Q60 60 80 40' fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.05'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }} />
          {/* Ghost watermark */}
          <div className="absolute inset-0 flex items-center justify-end px-10 overflow-hidden select-none" aria-hidden>
            <span className="font-display font-800 text-[18vw] leading-none tracking-tight uppercase"
              style={{ color: 'rgba(92,122,66,0.10)' }}>
              CAFE
            </span>
          </div>
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
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
            <span style={{ color: ACCENT_L }}>Cafe & Co-working</span>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px" style={{ background: ACCENT_L }} />
            <span className="font-body text-[11px] tracking-widest2 uppercase" style={{ color: ACCENT_L }}>
              The Central Hub · The Compound, Dubai
            </span>
          </div>

          <h1 className="font-display font-800 text-compound-white leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            Cafe &<br />Co-working
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <p className="font-body text-compound-white/60 text-[1.05rem] max-w-lg leading-relaxed">
              The beating heart of The Compound — an open, plant-filled cafe and
              co-working floor that connects every space and every person under one roof.
            </p>
            <a
              href="/membership"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 text-compound-white font-display font-600 text-[11px] tracking-widest uppercase transition-colors"
              style={{ background: ACCENT }}
              onMouseEnter={e => e.currentTarget.style.background = ACCENT_L}
              onMouseLeave={e => e.currentTarget.style.background = ACCENT}
            >
              Become a Member
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            {[
              { v: 'Open',   u: '7 Days' },
              { v: '50+',    u: 'Seats' },
              { v: '1 Gbps', u: 'Wi-Fi' },
              { v: '5',      u: 'Spaces Connected' },
            ].map(({ v, u }) => (
              <div key={u}>
                <p className="font-display font-800 text-compound-white text-[1.8rem] leading-none">
                  {v}<span className="text-[1rem] ml-1" style={{ color: ACCENT_L }}>{u}</span>
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
              The Centre of Everything
            </h2>
            <div className="space-y-5 font-body text-compound-steel leading-relaxed text-[0.95rem] max-w-prose">
              <p>
                The Cafe & Co-working space is not an afterthought. It is the architectural and social core of The Compound — the open floor that every other space opens onto, and the place where a food brand developer, a car collector, a remote product manager, and a private chef are likely to share the same long table at 9am.
              </p>
              <p>
                Designed around biophilic principles, the space uses full-height glazing on two sides, a skylit atrium, and structural planting throughout — not potted plants moved in for effect, but integrated greenery that forms room dividers, filters light, and meaningfully improves air quality across the floor.
              </p>
              <p>
                Seating is deliberately mixed: long shared work tables with integrated USB-C and USB-A charging ports for focused individual work, low lounge clusters for informal meetings and video calls, high counter seating along the window line for quick working lunches, and quieter booth zones tucked behind planted dividers for anything that needs a degree of acoustic separation.
              </p>
              <p>
                The coffee bar is a proper one — single-origin espresso and filter, prepared well, with a rotating food menu built for people who are actually here to work. The Cafe is the only part of The Compound that is openly accessible without a booking or membership, which means it is also the easiest place to encounter what The Compound is actually about.
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
                  ['Size',      '~3,500 sq ft (central hub)'],
                  ['Seating',   '50+ across all zones'],
                  ['Hours',     '7am – 10pm · 7 days a week'],
                  ['Access',    'Open to all · no booking needed'],
                  ['Wi-Fi',     '1 Gbps · enterprise grade'],
                  ['Charging',  'USB-C + USB-A at every seat'],
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
                Membership Includes
              </p>
              <ul className="space-y-2.5">
                {[
                  'Unlimited daily cafe & co-working access',
                  'Dedicated locker storage',
                  'Guest passes (2/month)',
                  'Priority booking for all spaces',
                  'Member events & community access',
                  'Discounted space hire rates',
                  'Monthly Compound newsletter',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 mt-2 shrink-0" style={{ background: ACCENT }} />
                    <span className="font-body text-[0.875rem] text-compound-steel">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/membership"
              className="flex items-center justify-center gap-3 w-full py-4 text-compound-white font-display font-600 text-[12px] tracking-widest uppercase transition-colors"
              style={{ background: ACCENT }}
              onMouseEnter={e => e.currentTarget.style.background = ACCENT_L}
              onMouseLeave={e => e.currentTarget.style.background = ACCENT}
            >
              Become a Member
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </aside>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="bg-compound-surface py-20 lg:py-28 border-t border-compound-border">
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

          {/* Wide hero image + 3-col row */}
          <div className="space-y-4">
            {/* Full-width atrium render */}
            <div className="group relative overflow-hidden">
              <div className={`relative w-full ${GALLERY_IMAGES[0].aspect} overflow-hidden`}
                style={{ background: GALLERY_IMAGES[0].gradient }}>
                <div className="absolute inset-0" style={{
                  backgroundImage: GALLERY_IMAGES[0].pattern,
                  backgroundSize: '40px 40px',
                }} />
                {/* Ghost label */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden>
                  <span className="font-display font-800 text-[8rem] lg:text-[12rem] leading-none tracking-tight uppercase"
                    style={{ color: 'rgba(92,122,66,0.09)' }}>
                    {GALLERY_IMAGES[0].label}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-body text-[10px] tracking-widest2 uppercase mb-1"
                    style={{ color: ACCENT_L }}>
                    Cafe & Co-working
                  </p>
                  <p className="font-display font-700 text-compound-white text-[1.2rem]">
                    {GALLERY_IMAGES[0].label}
                  </p>
                  <p className="font-body text-compound-white/60 text-[0.85rem] mt-0.5">
                    {GALLERY_IMAGES[0].sub}
                  </p>
                </div>
                <div className="absolute top-4 right-4 px-2.5 py-1 border border-white/20 bg-black/30 backdrop-blur-sm">
                  <span className="font-body text-[9px] tracking-widest uppercase text-white/50">Render</span>
                </div>
              </div>
            </div>

            {/* 3-col row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {GALLERY_IMAGES.slice(1).map(img => (
                <div key={img.label} className="group relative overflow-hidden">
                  <div className={`relative w-full ${img.aspect} overflow-hidden`}
                    style={{ background: img.gradient }}>
                    <div className="absolute inset-0" style={{
                      backgroundImage: img.pattern,
                      backgroundSize: '40px 40px',
                    }} />
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden>
                      <span className="font-display font-800 text-[4rem] lg:text-[5rem] leading-none tracking-tight uppercase text-center"
                        style={{ color: 'rgba(92,122,66,0.10)' }}>
                        {img.label}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-body text-[9px] tracking-widest2 uppercase mb-0.5"
                        style={{ color: ACCENT_L }}>
                        Cafe & Co-working
                      </p>
                      <p className="font-display font-700 text-compound-white text-[0.95rem]">
                        {img.label}
                      </p>
                      <p className="font-body text-compound-white/55 text-[0.78rem] mt-0.5">
                        {img.sub}
                      </p>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 border border-white/20 bg-black/30 backdrop-blur-sm">
                      <span className="font-body text-[9px] tracking-widest uppercase text-white/50">Render</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="bg-compound-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionEyebrow light>Amenities</SectionEyebrow>
          <h2 className="font-display font-800 leading-none tracking-tight text-compound-white mb-14"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
            Everything You Need<br />to Do Your Best Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {AMENITIES.map(a => (
              <div key={a.title}
                className="bg-compound-black p-8 flex flex-col gap-4 hover:bg-[#0f1409] transition-colors group">
                <div className="w-10 h-10 border flex items-center justify-center transition-colors"
                  style={{ borderColor: `${ACCENT}55`, color: ACCENT }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = ACCENT}
                  onMouseLeave={e => e.currentTarget.style.borderColor = `${ACCENT}55`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    {a.icon}
                  </svg>
                </div>
                <h3 className="font-display font-700 text-[1rem] text-compound-white leading-snug">
                  {a.title}
                </h3>
                <p className="font-body text-[0.875rem] text-compound-white/40 leading-relaxed">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP CTA ── */}
      <section className="bg-compound-white py-20 lg:py-28 border-t border-compound-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-compound-border overflow-hidden">

            {/* Left: pitch */}
            <div className="p-10 lg:p-14 flex flex-col justify-between gap-10">
              <div>
                <SectionEyebrow>Membership</SectionEyebrow>
                <h2 className="font-display font-800 leading-none tracking-tight text-compound-black mb-6"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                  Make The Compound<br />Your Base
                </h2>
                <p className="font-body text-compound-steel text-[0.95rem] leading-relaxed max-w-md">
                  A Compound membership gives you unlimited access to the Cafe & Co-working space every day —
                  plus priority booking on all five spaces, discounted hire rates, locker storage, and entry
                  to members-only events across the building.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Unlimited', 'daily cafe access'],
                  ['Priority',  'space booking'],
                  ['Discounts', 'on all space hire'],
                  ['Events',    'community & network'],
                ].map(([v, l]) => (
                  <div key={l} className="border-t border-compound-border pt-4">
                    <p className="font-display font-700 text-[1.1rem] text-compound-black"
                      style={{ color: ACCENT }}>{v}</p>
                    <p className="font-body text-[12px] text-compound-steel mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA panel */}
            <div className="p-10 lg:p-14 flex flex-col justify-between gap-8"
              style={{ background: ACCENT }}>
              <div>
                <p className="font-display font-800 text-compound-white text-[11px] tracking-widest2 uppercase mb-4"
                  style={{ opacity: 0.7 }}>
                  Join The Compound
                </p>
                <h3 className="font-display font-800 text-compound-white leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                  One membership.<br />Five world-class spaces.
                </h3>
              </div>

              <ul className="space-y-3">
                {[
                  'Unlimited Cafe & Co-working access',
                  '2 guest passes per month',
                  'Dedicated locker',
                  'Priority space reservations',
                  'Member-only events',
                  'Discounted space hire',
                ].map(perk => (
                  <li key={perk} className="flex items-center gap-3">
                    <svg className="w-4 h-4 shrink-0 text-compound-white/70" fill="none"
                      stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-body text-[0.875rem] text-compound-white/80">{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4">
                <a
                  href="/membership"
                  className="inline-flex items-center justify-center gap-3 w-full py-4 bg-compound-white font-display font-700 text-[13px] tracking-widest uppercase transition-colors hover:bg-compound-surface"
                  style={{ color: ACCENT }}
                >
                  Become a Member
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <p className="font-body text-[11px] text-compound-white/50 text-center">
                  Pricing on enquiry · Annual and monthly plans available
                </p>
              </div>
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
            to="/"
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
