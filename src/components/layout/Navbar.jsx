import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const spaces = [
  { label: 'Cucina Edit',           to: '/spaces/cucina-edit' },
  { label: 'Ghost Dinners Kitchen',  to: '/spaces/ghost-dinners' },
  { label: 'Serveo Offices',         to: '/spaces/serveo-offices' },
  { label: 'Automotive Vault',       to: '/spaces/automotive-vault' },
  { label: 'Cafe & Co-working',      to: '/spaces/cafe-coworking' },
  { label: 'Master Floor Plan',      to: '/floor-plan' },
]

const navItems = [
  { label: 'Home',              to: '/' },
  { label: 'Spaces',           dropdown: spaces },
  { label: 'Membership',       to: '/membership' },
  { label: 'Lease / Rent',     to: '/lease' },
  { label: 'Contact',          to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen]     = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const linkClass =
    'text-[13px] font-body font-medium tracking-widest2 uppercase transition-colors duration-200'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-compound-white/95 backdrop-blur-md border-b border-compound-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="w-7 h-7 border-2 border-compound-amber flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-300">
            <span className="w-2 h-2 bg-compound-amber block -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </span>
          <span className="font-display font-800 text-[15px] tracking-widest2 uppercase text-compound-black">
            The Compound
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) =>
            item.dropdown ? (
              <li key={item.label} className="relative" ref={dropRef}>
                <button
                  onClick={() => setDropOpen((v) => !v)}
                  className={`${linkClass} flex items-center gap-1.5 ${
                    scrolled ? 'text-compound-steel hover:text-compound-black' : 'text-compound-white/70 hover:text-compound-white'
                  }`}
                >
                  {item.label}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-compound-white border border-compound-border shadow-xl">
                    {/* Industrial corner accent */}
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-px bg-compound-amber" />
                    <ul className="py-2">
                      {spaces.map((space) => (
                        <li key={space.label}>
                          <Link
                            to={space.to}
                            onClick={() => setDropOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-[12px] font-body font-medium tracking-widest uppercase text-compound-steel hover:text-compound-black hover:bg-compound-surface transition-colors group"
                          >
                            <span className="w-1 h-1 bg-compound-amber opacity-0 group-hover:opacity-100 transition-opacity" />
                            {space.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={`${linkClass} ${
                    scrolled ? 'text-compound-steel hover:text-compound-black' : 'text-compound-white/70 hover:text-compound-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* CTA */}
        <Link
          to="/lease"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-compound-amber text-compound-white text-[12px] font-display font-600 tracking-widest uppercase hover:bg-compound-amber-light transition-colors duration-200"
        >
          Inquire
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px transition-all duration-200 ${scrolled || mobileOpen ? 'bg-compound-black' : 'bg-compound-white'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px transition-all duration-200 ${scrolled || mobileOpen ? 'bg-compound-black' : 'bg-compound-white'} ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px transition-all duration-200 ${scrolled || mobileOpen ? 'bg-compound-black' : 'bg-compound-white'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-compound-white border-t border-compound-border">
          <ul className="py-4">
            {navItems.map((item) =>
              item.dropdown ? (
                <li key={item.label}>
                  <p className="px-6 py-2 text-[11px] font-display font-700 tracking-widest2 uppercase text-compound-amber">
                    {item.label}
                  </p>
                  {spaces.map((space) => (
                    <Link
                      key={space.label}
                      to={space.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 pl-10 pr-6 py-2.5 text-[12px] font-body tracking-wider uppercase text-compound-steel hover:text-compound-black transition-colors"
                    >
                      <span className="w-1 h-1 bg-compound-amber" />
                      {space.label}
                    </Link>
                  ))}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-3 text-[12px] font-body font-medium tracking-widest uppercase text-compound-steel hover:text-compound-black transition-colors border-b border-compound-border/50"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
          <div className="px-6 pb-6">
            <Link
              to="/lease"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-3 bg-compound-amber text-compound-white text-[12px] font-display font-600 tracking-widest uppercase"
            >
              Inquire Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
