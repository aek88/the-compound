import Hero from '../components/sections/Hero'
import SpacesPreview from '../components/sections/SpacesPreview'
import CtaSection from '../components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <Hero />
      <SpacesPreview />
      <CtaSection />

      {/* Membership teaser */}
      <section id="membership" className="bg-compound-surface py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-compound-amber" />
            <span className="font-body text-[11px] tracking-widest2 uppercase text-compound-amber">Access & Perks</span>
          </span>
          <h2 className="font-display font-800 text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-compound-black">
            Membership
          </h2>
          <p className="font-body text-compound-steel mt-4 max-w-md mb-8">
            Flexible tiers giving unlimited access to co-working, priority space booking, member events, and The Compound community.
          </p>
          <a
            href="/membership"
            className="inline-flex items-center gap-3 px-7 py-4 bg-compound-black text-compound-white font-display font-600 text-[13px] tracking-widest uppercase hover:bg-compound-amber transition-colors duration-200"
          >
            View Membership Plans
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Lease / Rent inquiry */}
      <section id="lease" className="bg-compound-white py-24 lg:py-32 border-t border-compound-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-compound-amber" />
            <span className="font-body text-[11px] tracking-widest2 uppercase text-compound-amber">Get Space</span>
          </span>
          <h2 className="font-display font-800 text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-compound-black mb-4">
            Lease / Rent Inquiry
          </h2>
          <p className="font-body text-compound-steel max-w-md mb-10">
            Interested in a space at The Compound? Fill in your details and our team will be in touch within 24 hours.
          </p>
          <a
            href="/lease"
            className="inline-flex items-center gap-3 px-7 py-4 bg-compound-amber text-compound-white font-display font-600 text-[13px] tracking-widest uppercase hover:bg-compound-amber-light transition-colors"
          >
            Start Inquiry
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-compound-black text-compound-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-compound-amber" />
            <span className="font-body text-[11px] tracking-widest2 uppercase text-compound-amber">Reach Out</span>
          </span>
          <h2 className="font-display font-800 text-[clamp(2rem,5vw,3.5rem)] tracking-tight">
            Contact
          </h2>
          <p className="font-body text-compound-white/50 mt-4 max-w-sm">
            hello@thecompound.ae &mdash; Dubai, United Arab Emirates
          </p>
        </div>
      </section>
    </>
  )
}
