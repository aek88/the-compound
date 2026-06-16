export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Background: dark concrete gradient + noise texture */}
      <div className="absolute inset-0 bg-compound-black">
        {/* Warm industrial gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1510] via-compound-black to-[#0a0d0f]" />
        {/* Subtle grid overlay (blueprint/warehouse feel) */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Large amber accent: industrial stripe top-right */}
        <div className="absolute top-0 right-0 w-px h-full bg-compound-amber opacity-20" />
        <div className="absolute top-0 right-16 w-px h-3/4 bg-compound-amber opacity-10" />
        {/* Glow */}
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full bg-compound-amber/5 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-28 w-full">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-8">
          <span className="block w-8 h-px bg-compound-amber" />
          <span className="font-body text-[11px] font-medium tracking-widest2 uppercase text-compound-amber">
            Dubai, UAE &mdash; Est. 2024
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-800 text-compound-white leading-[0.92] tracking-tight mb-8">
          <span className="block text-[clamp(3.5rem,10vw,9rem)]">THE</span>
          <span className="block text-[clamp(3.5rem,10vw,9rem)] text-compound-amber">COMPOUND</span>
        </h1>

        {/* Descriptor row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mt-12 pt-8 border-t border-white/10">

          <p className="font-body font-300 text-compound-white/60 text-[1.05rem] leading-relaxed max-w-md">
            A 20,000 sq&nbsp;ft multi-purpose warehouse where distinct businesses
            converge — unified by raw industrial space and a shared culture
            of craft, creativity, and ambition.
          </p>

          {/* Stats row */}
          <div className="flex gap-10 lg:gap-14 shrink-0">
            {[
              { value: '20K', unit: 'sq ft', label: 'Facility' },
              { value: '5',   unit: '+',     label: 'Businesses' },
              { value: '1',   unit: '',      label: 'Destination' },
            ].map(({ value, unit, label }) => (
              <div key={label} className="text-center">
                <p className="font-display font-800 text-compound-white text-[2.2rem] leading-none">
                  {value}<span className="text-compound-amber text-[1.4rem]">{unit}</span>
                </p>
                <p className="font-body text-[10px] tracking-widest2 uppercase text-compound-white/40 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap gap-4 mt-10">
          <a
            href="#spaces"
            className="inline-flex items-center gap-3 px-7 py-4 bg-compound-amber text-compound-white font-display font-600 text-[13px] tracking-widest uppercase hover:bg-compound-amber-light transition-colors duration-200"
          >
            Explore Spaces
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#lease"
            className="inline-flex items-center gap-3 px-7 py-4 border border-compound-white/20 text-compound-white/70 font-display font-600 text-[13px] tracking-widest uppercase hover:border-compound-white/50 hover:text-compound-white transition-colors duration-200"
          >
            Lease Inquiry
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 lg:right-10 z-10 flex flex-col items-center gap-3">
        <span className="font-body text-[10px] tracking-widest2 uppercase text-compound-white/30 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="block w-px h-12 bg-gradient-to-b from-compound-white/30 to-transparent" />
      </div>

      {/* Bottom diagonal cut */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-compound-white"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
      />
    </section>
  )
}
