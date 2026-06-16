import { Link } from 'react-router-dom'

export default function MembershipSuccess() {
  return (
    <div className="bg-compound-black min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center py-20">
        {/* Check icon */}
        <div className="w-16 h-16 mx-auto mb-8 border-2 border-compound-amber flex items-center justify-center">
          <svg className="w-8 h-8 text-compound-amber" fill="none"
            stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="text-compound-amber text-[11px] font-display font-700 tracking-widest2 uppercase mb-4">
          Payment Confirmed
        </p>
        <h1 className="font-display font-800 text-3xl md:text-4xl tracking-tight text-compound-white mb-5">
          Welcome to The Compound.
        </h1>
        <p className="text-compound-concrete text-base leading-relaxed mb-3">
          Your membership is now active. A confirmation email is on its way with
          everything you need to get started — including your access details and
          a link to manage your subscription.
        </p>
        <p className="text-compound-steel text-[13px] mb-12">
          Questions? Reach us at{' '}
          <a
            href="mailto:hello@thecompound.ae"
            className="text-compound-amber hover:underline"
          >
            hello@thecompound.ae
          </a>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/spaces/cafe-coworking"
            className="px-8 py-3.5 bg-compound-amber hover:bg-compound-amber-light text-compound-white text-[12px] font-display font-700 tracking-widest uppercase transition-colors duration-200"
          >
            Explore Your Space
          </Link>
          <Link
            to="/"
            className="px-8 py-3.5 border border-compound-steel/40 text-compound-concrete hover:text-compound-white hover:border-compound-white text-[12px] font-display font-700 tracking-widest uppercase transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
