import { Link } from 'react-router-dom'

// Inline SVG patterns used as placeholder imagery for each space
const PATTERNS = {
  diagonal: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20L20 0' stroke='%23ffffff' stroke-width='0.4' opacity='0.12'/%3E%3C/svg%3E")`,
  grid:     `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h32v32H0z' fill='none'/%3E%3Cpath d='M0 0h1v32H0zM31 0h1v32h-1zM0 0v1h32V0zM0 31v1h32v-1z' fill='%23fff' opacity='0.07'/%3E%3C/svg%3E")`,
  dots:     `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ffffff' opacity='0.12'/%3E%3C/svg%3E")`,
  hatch:    `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8h16M8 0v16' stroke='%23fff' stroke-width='0.3' opacity='0.09'/%3E%3C/svg%3E")`,
  chevron:  `url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l20 10L40 0' fill='none' stroke='%23fff' stroke-width='0.4' opacity='0.1'/%3E%3C/svg%3E")`,
}

const spaces = [
  {
    id: 'cucina-edit',
    name: 'Cucina Edit',
    slug: '/spaces/cucina-edit',
    category: 'Culinary Workshop',
    featured: true,
    description:
      'A refined culinary studio where chefs, food creators, and hospitality brands develop, test, and refine their concepts. State-of-the-art equipment in a space built for inspiration.',
    tags: ['Private Bookings', 'Photography Studio', 'Events'],
    image: {
      gradient: 'linear-gradient(135deg, #3d1f0a 0%, #7a3b18 40%, #a8581f 70%, #c47a3a 100%)',
      pattern: PATTERNS.diagonal,
      label: 'Cucina',
      labelColor: 'rgba(255,220,160,0.08)',
    },
  },
  {
    id: 'ghost-dinners',
    name: 'Ghost Dinners Kitchen',
    slug: '/spaces/ghost-dinners',
    category: 'Development Kitchen',
    featured: false,
    description:
      'A high-spec dark kitchen purpose-built for delivery-first concepts and culinary R&D. Full commercial fit-out, cold storage, and dedicated dispatch logistics.',
    tags: ['Commercial Grade', 'Delivery Ready', 'R&D'],
    image: {
      gradient: 'linear-gradient(160deg, #0a0a0a 0%, #161410 50%, #1e1a14 100%)',
      pattern: PATTERNS.chevron,
      label: 'Ghost',
      labelColor: 'rgba(255,255,255,0.04)',
    },
  },
  {
    id: 'automotive-vault',
    name: 'Automotive Vault',
    slug: '/spaces/automotive-vault',
    category: 'Automotive',
    featured: false,
    description:
      'A precision garage and showroom for collectors, restorers, and performance specialists. Climate-controlled bays, workshop equipment, and private storage.',
    tags: ['Workshop Bays', 'Climate Storage', 'Showroom'],
    image: {
      gradient: 'linear-gradient(160deg, #111111 0%, #1c1c1c 50%, #252220 100%)',
      pattern: PATTERNS.hatch,
      label: 'Vault',
      labelColor: 'rgba(255,255,255,0.04)',
    },
  },
  {
    id: 'serveo-offices',
    name: 'Serveo Offices',
    slug: '/spaces/serveo-offices',
    category: 'Professional Services',
    featured: false,
    description:
      "Private office suites and serviced desks for businesses that demand a serious address. Fully equipped, tech-ready, and connected to The Compound's network.",
    tags: ['Private Suites', 'Meeting Rooms', 'Serviced'],
    image: {
      gradient: 'linear-gradient(145deg, #0f1d2e 0%, #162940 50%, #1e3554 100%)',
      pattern: PATTERNS.grid,
      label: 'Serveo',
      labelColor: 'rgba(100,160,255,0.06)',
    },
  },
  {
    id: 'cafe-coworking',
    name: 'Cafe & Co-working',
    slug: '/spaces/cafe-coworking',
    category: 'Community Hub',
    featured: false,
    description:
      'The beating heart of The Compound. Specialty coffee, open co-working desks, and the social infrastructure that connects every business under this roof.',
    tags: ['Specialty Coffee', 'Open Desks', 'Events'],
    image: {
      gradient: 'linear-gradient(135deg, #7a4a10 0%, #a8650f 40%, #c9913a 75%, #e5b86a 100%)',
      pattern: PATTERNS.dots,
      label: 'Cafe',
      labelColor: 'rgba(255,240,200,0.1)',
    },
  },
]

function PlaceholderImage({ image, tall = false }) {
  return (
    <div
      className={`relative w-full overflow-hidden ${tall ? 'h-full min-h-[420px]' : 'h-56'}`}
      style={{ background: image.gradient }}
    >
      {/* Texture pattern */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: image.pattern, backgroundSize: '20px 20px' }}
      />
      {/* Large ghost label — watermark */}
      <div
        className="absolute inset-0 flex items-end justify-start p-6 overflow-hidden select-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-800 leading-none tracking-tight text-[6rem] lg:text-[8rem] uppercase"
          style={{ color: image.labelColor }}
        >
          {image.label}
        </span>
      </div>
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      {/* Bottom amber rule */}
      <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-compound-amber" />
    </div>
  )
}

function SpaceCard({ space, featured = false }) {
  return (
    <article
      className={`group bg-compound-white border border-compound-border flex flex-col overflow-hidden
        hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300
        ${featured ? 'lg:flex-row' : ''}`}
    >
      {/* Image */}
      <div className={featured ? 'lg:w-[55%] shrink-0' : 'w-full'}>
        <PlaceholderImage image={space.image} tall={featured} />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-7 lg:p-8 flex-1">
        <div>
          <p className="font-body text-[10px] font-medium tracking-widest2 uppercase text-compound-amber mb-3">
            {space.category}
          </p>
          <h3 className={`font-display font-800 tracking-tight text-compound-black leading-tight mb-3 ${
            featured ? 'text-[1.75rem] lg:text-[2.25rem]' : 'text-[1.25rem]'
          }`}>
            {space.name}
          </h3>
          <p className="font-body text-compound-steel leading-relaxed text-[0.9rem] mb-5">
            {space.description}
          </p>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {space.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 border border-compound-border text-[10px] font-body font-medium tracking-widest uppercase text-compound-concrete"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          to={space.slug}
          className="inline-flex items-center gap-2.5 self-start font-display font-600 text-[12px] tracking-widest uppercase text-compound-black border-b border-compound-black pb-0.5
            hover:text-compound-amber hover:border-compound-amber transition-colors duration-200 group-hover:gap-4"
        >
          Learn More
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

export default function SpacesPreview() {
  const [featured, ...rest] = spaces

  return (
    <section id="spaces" className="bg-compound-surface py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <span className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-compound-amber" />
              <span className="font-body text-[11px] font-medium tracking-widest2 uppercase text-compound-amber">
                Under One Roof
              </span>
            </span>
            <h2 className="font-display font-800 text-[clamp(2.2rem,5vw,3.75rem)] leading-none tracking-tight text-compound-black">
              The Spaces
            </h2>
          </div>
          <p className="font-body text-compound-steel text-[0.95rem] leading-relaxed max-w-[360px]">
            Five distinct businesses under 20,000&nbsp;sq&nbsp;ft of industrial
            space — each with its own identity, connected by a shared culture.
          </p>
        </div>

        {/* Featured card — Cucina Edit */}
        <div className="mb-4">
          <SpaceCard space={featured} featured />
        </div>

        {/* 2-col row: Ghost Dinners + Automotive Vault */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {rest.slice(0, 2).map(space => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>

        {/* 2-col row: Serveo + Cafe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rest.slice(2).map(space => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>

        {/* "View all" link */}
        <div className="flex justify-center mt-12">
          <a
            href="/spaces"
            className="inline-flex items-center gap-3 font-display font-600 text-[12px] tracking-widest uppercase text-compound-steel hover:text-compound-black transition-colors duration-200"
          >
            <span className="w-8 h-px bg-compound-concrete" />
            View All Spaces
            <span className="w-8 h-px bg-compound-concrete" />
          </a>
        </div>
      </div>
    </section>
  )
}
