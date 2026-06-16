import { useState } from 'react'
import { Link } from 'react-router-dom'

// ── Pricing tiers ──────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: 'day_pass',
    name: 'Day Pass',
    price: '75',
    period: 'per day',
    billing: 'One-time · No commitment',
    badge: null,
    featured: false,
    ctaLabel: 'Buy a Day Pass',
    perks: [
      'Drop-in access, any day',
      '1 Gbps Wi-Fi included',
      'USB-C power at every seat',
      'First drink on arrival',
      'Cafe hours access (7am – 10pm)',
      'Hot-desk booking on the day',
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: '550',
    period: 'per month',
    billing: 'Billed monthly · Cancel anytime',
    badge: 'MOST POPULAR',
    featured: true,
    ctaLabel: 'Subscribe Monthly',
    perks: [
      'Everything in Day Pass',
      'Unlimited daily access',
      'Hot-desk priority booking',
      '5 meeting room hours / month',
      '10% food & beverage discount',
      'Community events access',
      'Mail & package handling',
    ],
  },
  {
    id: 'annual',
    name: 'Annual',
    price: '5,000',
    period: 'per year',
    billing: 'Billed annually · Saves AED 1,600',
    badge: 'BEST VALUE',
    featured: false,
    ctaLabel: 'Subscribe Annually',
    perks: [
      'Everything in Monthly',
      'Permanent dedicated desk',
      '15 meeting room hours / month',
      '2 guest day passes / month',
      '20% food & beverage discount',
      'Locker storage included',
      'Priority event & workshop access',
    ],
  },
]

const FAQS = [
  {
    q: 'Can I upgrade my plan later?',
    a: 'Yes — you can upgrade from a Day Pass to Monthly or Annual at any time. Members upgrading from Monthly to Annual receive a prorated credit for any remaining balance.',
  },
  {
    q: 'When does my membership activate?',
    a: 'Memberships activate immediately after your first successful payment. Day passes are valid for the calendar day of purchase and expire at midnight.',
  },
  {
    q: 'Are there any setup or entry fees?',
    a: 'None. The price you see is the price you pay. Day passes include your first drink; subscriptions include a welcome orientation of the space.',
  },
  {
    q: "Can I access other spaces in The Compound with my membership?",
    a: "Membership covers the Cafe & Co-working space. Individual bookings for Ghost Dinners Kitchen, Cucina Edit, and the Automotive Vault are handled separately through each space's own page.",
  },
  {
    q: 'How do I cancel a subscription?',
    a: 'You can cancel any subscription directly from your Stripe customer portal — a link is included in every payment confirmation email. Cancellations take effect at the end of the current billing period.',
  },
]

// ── Sub-components ─────────────────────────────────────────────────────────────

function CheckIcon({ amber }) {
  return (
    <svg
      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${amber ? 'text-compound-amber' : 'text-compound-black'}`}
      fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function PlanCard({ plan, loading, onSubscribe }) {
  const { featured } = plan
  const isLoading = loading === plan.id
  const anyLoading = loading !== null

  if (featured) {
    return (
      <div className="bg-compound-black flex flex-col relative">
        {/* Top amber accent bar */}
        <div className="h-1 bg-compound-amber w-full" />
        <div className="p-8 flex flex-col flex-1">
          {/* Badge */}
          <span className="inline-block self-start px-3 py-1 bg-compound-amber text-compound-black text-[10px] font-display font-700 tracking-widest uppercase mb-6">
            {plan.badge}
          </span>

          {/* Name */}
          <p className="text-compound-amber text-[11px] font-display font-700 tracking-widest2 uppercase mb-2">
            {plan.name}
          </p>

          {/* Price */}
          <div className="flex items-end gap-2 mb-1">
            <span className="text-compound-white text-[13px] font-display font-500 mt-1 self-start pt-1">AED</span>
            <span className="font-display font-800 text-5xl leading-none text-compound-white">{plan.price}</span>
          </div>
          <p className="text-compound-concrete text-[12px] mb-1">{plan.period}</p>
          <p className="text-compound-steel text-[11px] tracking-wide mb-8">{plan.billing}</p>

          <div className="border-t border-compound-steel/20 mb-7" />

          {/* Perks */}
          <ul className="space-y-3 flex-1 mb-8">
            {plan.perks.map(perk => (
              <li key={perk} className="flex items-start gap-3">
                <CheckIcon amber />
                <span className="text-compound-concrete text-[13px] leading-snug">{perk}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={() => onSubscribe(plan.id)}
            disabled={anyLoading}
            className="w-full py-4 bg-compound-amber hover:bg-compound-amber-light text-compound-white text-[12px] font-display font-700 tracking-widest uppercase flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Spinner /> : plan.ctaLabel}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-compound-white border border-compound-border flex flex-col">
      {/* Top accent bar */}
      <div className="h-1 bg-compound-border w-full" />
      <div className="p-8 flex flex-col flex-1">
        {/* Badge or spacer */}
        <div className="mb-6 h-7 flex items-center">
          {plan.badge && (
            <span className="inline-block px-3 py-1 bg-compound-surface border border-compound-amber text-compound-amber text-[10px] font-display font-700 tracking-widest uppercase">
              {plan.badge}
            </span>
          )}
        </div>

        {/* Name */}
        <p className="text-compound-steel text-[11px] font-display font-700 tracking-widest2 uppercase mb-2">
          {plan.name}
        </p>

        {/* Price */}
        <div className="flex items-end gap-2 mb-1">
          <span className="text-compound-steel text-[13px] font-display font-500 mt-1 self-start pt-1">AED</span>
          <span className="font-display font-800 text-5xl leading-none text-compound-black">{plan.price}</span>
        </div>
        <p className="text-compound-steel text-[12px] mb-1">{plan.period}</p>
        <p className="text-compound-steel text-[11px] tracking-wide mb-8">
          {plan.billing}
        </p>

        <div className="border-t border-compound-border mb-7" />

        {/* Perks */}
        <ul className="space-y-3 flex-1 mb-8">
          {plan.perks.map(perk => (
            <li key={perk} className="flex items-start gap-3">
              <CheckIcon amber={false} />
              <span className="text-compound-steel text-[13px] leading-snug">{perk}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => onSubscribe(plan.id)}
          disabled={anyLoading}
          className="w-full py-4 bg-compound-black hover:bg-compound-steel text-compound-white text-[12px] font-display font-700 tracking-widest uppercase flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Spinner /> : plan.ctaLabel}
        </button>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <>
      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Processing…
    </>
  )
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-compound-border last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between text-left py-5 gap-6 group"
      >
        <span className="font-display font-700 text-[15px] text-compound-black group-hover:text-compound-amber transition-colors leading-snug">
          {item.q}
        </span>
        <svg
          className={`w-4 h-4 text-compound-amber flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <p className="text-compound-steel text-[14px] leading-relaxed pb-5">
          {item.a}
        </p>
      )}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Membership() {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubscribe(planId) {
    setLoading(planId)
    setError(null)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(null)
    }
  }

  return (
    <div className="bg-compound-white min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-compound-black pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-compound-amber text-[11px] font-display font-700 tracking-widest2 uppercase mb-4">
            The Compound · Members&apos; Club
          </p>
          <h1 className="font-display font-800 text-4xl md:text-6xl tracking-tight text-compound-white mb-6 max-w-2xl">
            Join The Compound.
          </h1>
          <p className="text-compound-concrete text-base md:text-lg max-w-xl leading-relaxed mb-12">
            Access Dubai&apos;s most connected workspace — a 3,500 sq ft cafe and co-working hub
            at the heart of a 20,000 sq ft multi-use compound. Three tiers. One address.
          </p>
          {/* Quick stats */}
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {[
              ['Open 7 Days', 'No blackout dates'],
              ['50+ Seats', 'Hot-desks & lounges'],
              ['1 Gbps Wi-Fi', 'USB-C everywhere'],
              ['5 Spaces', 'One membership address'],
            ].map(([stat, label]) => (
              <div key={stat}>
                <p className="font-display font-700 text-compound-white text-lg">{stat}</p>
                <p className="text-compound-steel text-[12px] tracking-wide mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing tiers ── */}
      <section className="bg-compound-surface py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] font-display font-700 tracking-widest2 uppercase text-compound-steel mb-3">
              Pricing
            </p>
            <h2 className="font-display font-800 text-3xl md:text-4xl tracking-tight text-compound-black">
              Choose your tier.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                loading={loading}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>

          {/* Error message */}
          {error && (
            <div className="mt-6 p-4 border border-red-300 bg-red-50 text-red-700 text-[13px] text-center max-w-lg mx-auto">
              {error}
            </div>
          )}

          {/* Stripe trust badge */}
          <p className="text-center mt-8 text-[11px] text-compound-steel flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Payments are processed securely by Stripe. We never store your card details.
          </p>
        </div>
      </section>

      {/* ── What's included summary ── */}
      <section className="bg-compound-white py-20 px-4 md:px-6 border-t border-compound-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-display font-700 tracking-widest2 uppercase text-compound-amber mb-4">
                The Space
              </p>
              <h2 className="font-display font-800 text-2xl md:text-3xl tracking-tight text-compound-black mb-6">
                More than a desk.<br />A whole address.
              </h2>
              <p className="text-compound-steel leading-relaxed mb-5">
                Your membership puts you at the centre of The Compound — a 20,000 sq ft warehouse
                in Dubai housing a culinary studio, a professional development kitchen, a luxury
                automotive vault, and a full serviced office suite, all connected through your cafe.
              </p>
              <p className="text-compound-steel leading-relaxed">
                Show up when you want, stay as long as you need. Members get a private community
                to network and collaborate with the other operators inside The Compound.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Cafe & Co-working', detail: '3,500 sq ft · Your home base', color: '#5c7a42' },
                { label: 'Cucina Edit', detail: 'Culinary workshop next door', color: '#c47a3a' },
                { label: 'Ghost Dinners', detail: 'Dev kitchen · Same building', color: '#4d8c76' },
                { label: 'Serveo Offices', detail: 'Full office suite on site', color: '#1d4e8a' },
                { label: 'Automotive Vault', detail: 'Supercar storage visible from Cafe', color: '#3a5a72' },
                { label: 'Meeting Rooms', detail: 'Bookable as part of your plan', color: '#7A8290' },
              ].map(({ label, detail, color }) => (
                <div key={label} className="border border-compound-border p-4 bg-compound-surface">
                  <div className="w-5 h-0.5 mb-3" style={{ background: color }} />
                  <p className="font-display font-700 text-[12px] tracking-wide text-compound-black mb-1">{label}</p>
                  <p className="text-compound-steel text-[11px] leading-snug">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-compound-surface py-20 px-4 md:px-6 border-t border-compound-border">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-display font-700 tracking-widest2 uppercase text-compound-steel mb-3">
              Common Questions
            </p>
            <h2 className="font-display font-800 text-2xl md:text-3xl tracking-tight text-compound-black">
              Before you subscribe.
            </h2>
          </div>
          <div>
            {FAQS.map(item => (
              <FaqItem key={item.q} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-compound-black py-16 px-6 border-t border-compound-steel/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-display font-700 tracking-widest2 uppercase text-compound-amber mb-2">
              Not sure which tier?
            </p>
            <p className="font-display font-800 text-xl md:text-2xl text-compound-white">
              Start with a Day Pass — no commitment required.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => handleSubscribe('day_pass')}
              disabled={loading !== null}
              className="px-8 py-3.5 bg-compound-amber hover:bg-compound-amber-light text-compound-white text-[12px] font-display font-700 tracking-widest uppercase flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === 'day_pass' ? <Spinner /> : 'Buy Day Pass — AED 75'}
            </button>
            <Link
              to="/spaces/cafe-coworking"
              className="px-8 py-3.5 border border-compound-steel/40 text-compound-concrete hover:text-compound-white hover:border-compound-white text-[12px] font-display font-700 tracking-widest uppercase flex items-center justify-center transition-colors duration-200"
            >
              Tour the Space
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
