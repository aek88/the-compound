import { Link } from 'react-router-dom'

const SPACE_LINKS = [
  { label: 'Cucina Edit',           to: '/spaces/cucina-edit' },
  { label: 'Ghost Dinners Kitchen',  to: '/spaces/ghost-dinners' },
  { label: 'Serveo Offices',         to: '/spaces/serveo-offices' },
  { label: 'Automotive Vault',       to: '/spaces/automotive-vault' },
  { label: 'Cafe & Co-working',      to: '/spaces/cafe-coworking' },
]

export default function Footer() {
  return (
    <footer className="bg-compound-black text-compound-white/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-display font-700 text-[13px] tracking-widest2 uppercase text-compound-white mb-3">
            The Compound
          </p>
          <p className="text-[13px] font-body leading-relaxed">
            A 20,000 sqft multi-purpose warehouse facility in the UAE, housing businesses, creators, and makers under one roof.
          </p>
        </div>
        <div>
          <p className="font-display font-600 text-[11px] tracking-widest2 uppercase text-compound-amber mb-4">Spaces</p>
          <ul className="space-y-2 text-[13px] font-body">
            {SPACE_LINKS.map(s => (
              <li key={s.label}>
                <Link to={s.to} className="hover:text-compound-white transition-colors">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display font-600 text-[11px] tracking-widest2 uppercase text-compound-amber mb-4">Contact</p>
          <p className="text-[13px] font-body">Dubai, United Arab Emirates</p>
          <a href="mailto:hello@thecompound.ae" className="text-[13px] font-body hover:text-compound-white transition-colors mt-1 block">
            hello@thecompound.ae
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 max-w-7xl mx-auto px-6 lg:px-10 py-5 flex justify-between items-center text-[11px] font-body">
        <span>&copy; 2026 The Compound. All rights reserved.</span>
        <span className="tracking-widest uppercase text-compound-white/30">Dubai, UAE</span>
      </div>
    </footer>
  )
}
