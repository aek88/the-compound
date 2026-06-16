const membershipPerks = [
  'Access to cafe & co-working daily',
  'Priority event invitations',
  'Cross-tenant networking',
  'Guest passes each month',
]

const leasePoints = [
  'Flexible lease terms from 6 months',
  'Fully serviced or raw shell options',
  'Shared loading dock & parking',
  'On-site management & security',
]

export default function CtaSection() {
  return (
    <section id="cta" className="bg-compound-black">

      {/* Top rule with label */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 lg:pt-28">
        <div className="flex items-center gap-4 mb-16">
          <span className="flex-1 h-px bg-white/10" />
          <span className="font-body text-[11px] tracking-widest2 uppercase text-compound-white/30">
            Your Next Move
          </span>
          <span className="flex-1 h-px bg-white/10" />
        </div>
      </div>

      {/* Split panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">

        {/* — Membership — */}
        <div className="relative overflow-hidden px-8 lg:px-16 pb-20 lg:pb-28 pt-2 lg:pt-0">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-compound-amber/8 blur-[80px] pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              {/* Industrial diamond icon */}
              <span className="w-5 h-5 border border-compound-amber rotate-45 flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 bg-compound-amber block" />
              </span>
              <span className="font-body text-[11px] tracking-widest2 uppercase text-compound-amber">
                Membership
              </span>
            </div>

            <h2 className="font-display font-800 text-[clamp(2rem,4vw,3rem)] leading-none tracking-tight text-compound-white mb-5">
              Join The<br />Compound
            </h2>

            <p className="font-body text-compound-white/50 text-[0.95rem] leading-relaxed mb-10 max-w-sm">
              Become part of a curated community of makers, builders, and hospitality professionals operating under one industrial roof.
            </p>

            {/* Perks list */}
            <ul className="space-y-4 mb-12">
              {membershipPerks.map(perk => (
                <li key={perk} className="flex items-start gap-3">
                  <span className="w-px h-4 bg-compound-amber mt-0.5 shrink-0" />
                  <span className="font-body text-[0.875rem] text-compound-white/60">{perk}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <a
                href="#membership"
                className="inline-flex items-center gap-3 px-7 py-4 bg-compound-amber text-compound-white font-display font-600 text-[12px] tracking-widest uppercase hover:bg-compound-amber-light transition-colors duration-200"
              >
                Explore Membership
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-7 py-4 border border-white/15 text-compound-white/60 font-display font-600 text-[12px] tracking-widest uppercase hover:border-white/40 hover:text-compound-white transition-colors duration-200"
              >
                Ask a Question
              </a>
            </div>
          </div>
        </div>

        {/* — Lease / Rent — */}
        <div className="relative overflow-hidden px-8 lg:px-16 pb-20 lg:pb-28 pt-2 lg:pt-0 bg-[#0a0a08]">
          {/* Subtle blueprint grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-5 h-5 border border-compound-concrete/50 rotate-45 flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 bg-compound-concrete/50 block" />
              </span>
              <span className="font-body text-[11px] tracking-widest2 uppercase text-compound-concrete">
                Lease & Rent
              </span>
            </div>

            <h2 className="font-display font-800 text-[clamp(2rem,4vw,3rem)] leading-none tracking-tight text-compound-white mb-5">
              Secure Your<br />Space
            </h2>

            <p className="font-body text-compound-white/50 text-[0.95rem] leading-relaxed mb-10 max-w-sm">
              Whether you need a dark kitchen, private office, automotive bay, or bespoke workshop — we have a space configured for your operation.
            </p>

            {/* Points */}
            <ul className="space-y-4 mb-12">
              {leasePoints.map(point => (
                <li key={point} className="flex items-start gap-3">
                  <span className="w-px h-4 bg-compound-concrete/50 mt-0.5 shrink-0" />
                  <span className="font-body text-[0.875rem] text-compound-white/60">{point}</span>
                </li>
              ))}
            </ul>

            {/* Availability indicator */}
            <div className="flex items-center gap-3 mb-8 p-4 border border-white/8 bg-white/[0.03]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="font-body text-[12px] text-compound-white/40">
                Spaces currently available — limited units
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#lease"
                className="inline-flex items-center gap-3 px-7 py-4 bg-compound-white text-compound-black font-display font-600 text-[12px] tracking-widest uppercase hover:bg-compound-surface transition-colors duration-200"
              >
                Inquire Now
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/spaces"
                className="inline-flex items-center gap-3 px-7 py-4 border border-white/15 text-compound-white/60 font-display font-600 text-[12px] tracking-widest uppercase hover:border-white/40 hover:text-compound-white transition-colors duration-200"
              >
                Browse Spaces
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom band */}
      <div className="border-t border-white/10 max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-body tracking-widest uppercase">
        <span className="text-compound-white/20">The Compound — Dubai, UAE</span>
        <a
          href="mailto:hello@thecompound.ae"
          className="text-compound-white/30 hover:text-compound-amber transition-colors"
        >
          hello@thecompound.ae
        </a>
      </div>
    </section>
  )
}
