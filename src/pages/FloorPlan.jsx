import { Link } from 'react-router-dom'

const zones = [
  {
    id: 'cucina',
    name: 'Cucina Edit',
    type: 'Culinary Workshop',
    area: '≈ 1,200 sq ft',
    accent: '#c47a3a',
    href: '/spaces/cucina-edit',
    desc: 'Artisan pasta kitchen with 6 production stations, a content studio, and a private tasting room.',
  },
  {
    id: 'ghost',
    name: 'Ghost Dinners Kitchen',
    type: 'Development Kitchen',
    area: '≈ 1,800 sq ft',
    accent: '#4d8c76',
    href: '/spaces/ghost-dinners',
    desc: 'Commercial-grade development kitchen with walk-in cold storage and dispatch bay.',
  },
  {
    id: 'serveo',
    name: 'Serveo Group Offices',
    type: 'Office Suites',
    area: '≈ 3,000 sq ft',
    accent: '#1d4e8a',
    href: '/spaces/serveo-offices',
    desc: "Open-plan workspace, private offices, and boardroom for The Compound's anchor tenant.",
  },
  {
    id: 'cafe',
    name: 'Cafe & Co-working',
    type: 'Central Hub',
    area: '≈ 3,500 sq ft',
    accent: '#5c7a42',
    href: '/spaces/cafe-coworking',
    desc: 'The heart of The Compound — open to all, connecting every space within the building.',
  },
  {
    id: 'vault',
    name: 'Automotive Vault',
    type: 'Secure Vehicle Storage',
    area: '≈ 2,800 sq ft',
    accent: '#3a5a72',
    href: '/spaces/automotive-vault',
    desc: 'Walled vault with hydraulic lift, climate control, and a glass viewing gallery from the Cafe.',
  },
]

const WC = '#1a1a18'
const SYNE = 'Syne, sans-serif'
const INTER = 'Inter, sans-serif'

function FloorPlanSVG() {
  const acc = {
    cucina: '#c47a3a',
    ghost:  '#4d8c76',
    serveo: '#1d4e8a',
    cafe:   '#5c7a42',
    vault:  '#3a5a72',
  }
  const fills = {
    cucina: '#fff8f0',
    ghost:  '#f0f8f4',
    serveo: '#eef2fb',
    cafe:   '#f1f7ec',
    vault:  '#eef3f7',
  }

  return (
    <svg
      viewBox="0 0 1200 820"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      role="img"
      aria-label="The Compound master floor plan — 20,000 sq ft warehouse with five zones"
    >
      <rect width="1200" height="820" fill="white" />

      {/* ── ZONE FILLS ── */}
      <rect x="43"  y="53" width="333" height="333" fill={fills.cucina} />
      <rect x="383" y="53" width="248" height="333" fill={fills.ghost} />
      <rect x="638" y="53" width="518" height="333" fill={fills.serveo} />
      <rect x="43"  y="393" width="873" height="363" fill={fills.cafe} />
      <rect x="923" y="393" width="233" height="363" fill={fills.vault} />

      {/* ── OUTER WALLS ── */}
      {/* Top */}
      <line x1="40"  y1="50" x2="1160" y2="50"  stroke={WC} strokeWidth="7" strokeLinecap="square" />
      {/* East — roller door gap y=567→633 */}
      <line x1="1160" y1="50"  x2="1160" y2="567" stroke={WC} strokeWidth="7" strokeLinecap="square" />
      <line x1="1160" y1="633" x2="1160" y2="760" stroke={WC} strokeWidth="7" strokeLinecap="square" />
      {/* Bottom — main entry gap x=440→548 */}
      <line x1="40"  y1="760" x2="440"  y2="760" stroke={WC} strokeWidth="7" strokeLinecap="square" />
      <line x1="548" y1="760" x2="1160" y2="760" stroke={WC} strokeWidth="7" strokeLinecap="square" />
      {/* West */}
      <line x1="40"  y1="50"  x2="40"   y2="760" stroke={WC} strokeWidth="7" strokeLinecap="square" />

      {/* ── INTERIOR PARTITIONS ── */}
      {/* V1 Cucina|Ghost x=380 */}
      <line x1="380" y1="50"  x2="380" y2="390" stroke={WC} strokeWidth="5" strokeLinecap="square" />
      {/* V2 Ghost|Serveo x=635 */}
      <line x1="635" y1="50"  x2="635" y2="390" stroke={WC} strokeWidth="5" strokeLinecap="square" />
      {/* H1 y=390 — door gaps at x=150→200, x=455→505, x=757→807 */}
      <line x1="40"  y1="390" x2="150" y2="390" stroke={WC} strokeWidth="6" strokeLinecap="square" />
      <line x1="200" y1="390" x2="455" y2="390" stroke={WC} strokeWidth="6" strokeLinecap="square" />
      <line x1="505" y1="390" x2="757" y2="390" stroke={WC} strokeWidth="6" strokeLinecap="square" />
      <line x1="807" y1="390" x2="1160" y2="390" stroke={WC} strokeWidth="6" strokeLinecap="square" />

      {/* ── GLASS WALL x=920 ── */}
      <line x1="920" y1="393" x2="920" y2="757" stroke="#4488bb" strokeWidth="3.5" strokeDasharray="12,6" />
      <line x1="925" y1="393" x2="925" y2="757" stroke="#88bbdd" strokeWidth="1.5" strokeOpacity="0.5" />
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i}
          x1="914" y1={410 + i * 27}
          x2="931" y2={410 + i * 27}
          stroke="#4488bb" strokeWidth="1" strokeOpacity="0.5"
        />
      ))}

      {/* ── DOOR SYMBOLS ── */}
      {/* Cucina → Cafe */}
      <line x1="150" y1="390" x2="150" y2="340" stroke={WC} strokeWidth="1.5" />
      <path d="M200,390 A50,50 0 0,1 150,340" fill="none" stroke={WC} strokeWidth="1" strokeDasharray="4,3" />
      {/* Ghost → Cafe */}
      <line x1="455" y1="390" x2="455" y2="340" stroke={WC} strokeWidth="1.5" />
      <path d="M505,390 A50,50 0 0,1 455,340" fill="none" stroke={WC} strokeWidth="1" strokeDasharray="4,3" />
      {/* Serveo → Cafe */}
      <line x1="807" y1="390" x2="807" y2="340" stroke={WC} strokeWidth="1.5" />
      <path d="M757,390 A50,50 0 0,0 807,340" fill="none" stroke={WC} strokeWidth="1" strokeDasharray="4,3" />
      {/* Main entry south */}
      <line x1="494" y1="760" x2="494" y2="710" stroke={WC} strokeWidth="1.5" />
      <path d="M440,760 A54,54 0 0,0 494,710" fill="none" stroke={WC} strokeWidth="1" strokeDasharray="4,3" />

      {/* ── ROLLER DOOR HATCH (east wall, y=567→633) ── */}
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i}
          x1="1153" y1={569 + i * 5}
          x2="1168" y2={569 + i * 5}
          stroke="#888" strokeWidth="0.9"
        />
      ))}

      {/* ── FURNITURE — CUCINA EDIT ── */}
      {/* 6 pasta stations 3 cols × 2 rows */}
      {[0,1,2].map(c => [0,1].map(r => (
        <g key={`cu${c}${r}`}>
          <rect x={65+c*91} y={148+r*74} width="76" height="44" rx="2"
            fill="#ede8df" stroke={acc.cucina} strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1={65+c*91+10} y1={148+r*74+22} x2={65+c*91+66} y2={148+r*74+22}
            stroke={acc.cucina} strokeWidth="1" strokeOpacity="0.3" />
          <line x1={65+c*91+10} y1={148+r*74+32} x2={65+c*91+66} y2={148+r*74+32}
            stroke={acc.cucina} strokeWidth="1" strokeOpacity="0.3" />
        </g>
      )))}
      {/* Chef pass */}
      <rect x="65" y="308" width="285" height="22" rx="1"
        fill="#e0d8cc" stroke={acc.cucina} strokeWidth="0.8" strokeOpacity="0.5" />

      {/* ── FURNITURE — GHOST DINNERS ── */}
      {/* 6 cooktops 3 cols × 2 rows */}
      {[0,1,2].map(c => [0,1].map(r => (
        <g key={`gh${c}${r}`}>
          <rect x={390+c*74} y={135+r*82} width="62" height="58" rx="2"
            fill="#e6f0eb" stroke={acc.ghost} strokeWidth="0.8" strokeOpacity="0.5" />
          {[0,1].map(bx => [0,1].map(by => (
            <circle key={`b${bx}${by}`}
              cx={390+c*74+16+bx*28} cy={135+r*82+15+by*28}
              r="9" fill="none" stroke={acc.ghost} strokeWidth="1" strokeOpacity="0.4" />
          )))}
        </g>
      )))}
      {/* Walk-in cold room */}
      <rect x="390" y="316" width="238" height="48" rx="1"
        fill="#d8eee6" stroke={acc.ghost} strokeWidth="0.8" strokeDasharray="5,3" strokeOpacity="0.5" />
      <text x="509" y="344" textAnchor="middle"
        fontFamily={INTER} fontSize="7.5" fill={acc.ghost} fillOpacity="0.75">COLD STORAGE</text>

      {/* ── FURNITURE — SERVEO OFFICES ── */}
      {/* Desk grid 5 cols × 2 rows */}
      {[0,1,2,3,4].map(c => [0,1].map(r => (
        <rect key={`se${c}${r}`}
          x={650+c*88} y={132+r*60} width="66" height="36" rx="2"
          fill="#e2eaf6" stroke={acc.serveo} strokeWidth="0.8" strokeOpacity="0.5" />
      )))}
      {/* Boardroom table */}
      <ellipse cx="1038" cy="278" rx="76" ry="20"
        fill="#d8e4f4" stroke={acc.serveo} strokeWidth="1" strokeOpacity="0.6" />
      {[-50,-25,0,25,50].map(dx => (
        <rect key={`cT${dx}`} x={1038+dx-8} y="249" width="16" height="9" rx="1"
          fill="#c8d8ee" stroke={acc.serveo} strokeWidth="0.5" strokeOpacity="0.5" />
      ))}
      {[-50,-25,0,25,50].map(dx => (
        <rect key={`cB${dx}`} x={1038+dx-8} y="289" width="16" height="9" rx="1"
          fill="#c8d8ee" stroke={acc.serveo} strokeWidth="0.5" strokeOpacity="0.5" />
      ))}

      {/* ── FURNITURE — CAFE & CO-WORKING ── */}
      {/* Scattered round tables with chairs */}
      {[
        [115,492],[230,462],[345,522],[472,490],[588,458],[698,512],[795,482],[858,442],
        [140,625],[258,592],[378,648],[508,612],[622,578],[728,634],[822,594],
      ].map(([cx, cy]) => (
        <g key={`ct${cx}${cy}`}>
          <circle cx={cx} cy={cy} r="21"
            fill="#e6f0e0" stroke={acc.cafe} strokeWidth="0.8" strokeOpacity="0.5" />
          {[0,90,180,270].map(a => (
            <rect key={a} transform={`rotate(${a},${cx},${cy})`}
              x={cx-5} y={cy-32} width="10" height="9" rx="1.5"
              fill="#d8eacc" stroke={acc.cafe} strokeWidth="0.4" strokeOpacity="0.4" />
          ))}
        </g>
      ))}
      {/* Service bar */}
      <rect x="60" y="714" width="720" height="26" rx="2"
        fill="#d8e8cc" stroke={acc.cafe} strokeWidth="1" strokeOpacity="0.5" />
      <text x="420" y="731" textAnchor="middle"
        fontFamily={INTER} fontSize="7.5" fill={acc.cafe} fillOpacity="0.8">
        SERVICE BAR & COFFEE COUNTER
      </text>

      {/* ── FURNITURE — AUTOMOTIVE VAULT ── */}
      {/* 2 car silhouettes */}
      {[0,1].map(i => (
        <g key={`vc${i}`}>
          <rect x={932+i*108} y={428} width="90" height="170" rx="8"
            fill="#dce8f0" stroke={acc.vault} strokeWidth="1" strokeOpacity="0.6" />
          <rect x={940+i*108} y={448} width="74" height="40" rx="3"
            fill="#c4d8ea" stroke={acc.vault} strokeWidth="0.6" strokeOpacity="0.5" />
          <rect x={940+i*108} y={532} width="74" height="30" rx="2"
            fill="#c4d8ea" stroke={acc.vault} strokeWidth="0.6" strokeOpacity="0.5" />
        </g>
      ))}
      {/* Lift bay */}
      <rect x="928" y="624" width="224" height="112" rx="2"
        fill="#d0dfe8" stroke="#4488bb" strokeWidth="1.2" strokeDasharray="6,3" />
      <line x1="928" y1="680" x2="1152" y2="680" stroke="#4488bb" strokeWidth="0.7" strokeOpacity="0.4" />
      <line x1="1040" y1="624" x2="1040" y2="736" stroke="#4488bb" strokeWidth="0.7" strokeOpacity="0.4" />
      <text x="1040" y="673" textAnchor="middle"
        fontFamily={INTER} fontSize="7.5" fill={acc.vault} fillOpacity="0.85">CAR LIFT BAY</text>
      <text x="1040" y="688" textAnchor="middle"
        fontFamily={INTER} fontSize="9" fill={acc.vault} fillOpacity="0.5">↕</text>

      {/* ── ZONE LABELS ── */}
      <text x="210" y="80" textAnchor="middle"
        fontFamily={SYNE} fontWeight="700" fontSize="12" fill={acc.cucina} letterSpacing="1.5">CUCINA EDIT</text>
      <text x="210" y="96" textAnchor="middle"
        fontFamily={INTER} fontSize="8.5" fill={acc.cucina} fillOpacity="0.7">Culinary Workshop</text>
      <text x="210" y="110" textAnchor="middle"
        fontFamily={INTER} fontSize="7.5" fill="#aaa">≈ 1,200 sq ft</text>

      <text x="507" y="80" textAnchor="middle"
        fontFamily={SYNE} fontWeight="700" fontSize="12" fill={acc.ghost} letterSpacing="1.5">GHOST DINNERS</text>
      <text x="507" y="96" textAnchor="middle"
        fontFamily={INTER} fontSize="8.5" fill={acc.ghost} fillOpacity="0.7">Development Kitchen</text>
      <text x="507" y="110" textAnchor="middle"
        fontFamily={INTER} fontSize="7.5" fill="#aaa">≈ 1,800 sq ft</text>

      <text x="897" y="80" textAnchor="middle"
        fontFamily={SYNE} fontWeight="700" fontSize="12" fill={acc.serveo} letterSpacing="1.5">SERVEO GROUP OFFICES</text>
      <text x="897" y="96" textAnchor="middle"
        fontFamily={INTER} fontSize="8.5" fill={acc.serveo} fillOpacity="0.7">Office Suites · Meeting Rooms · Hot-Desks</text>
      <text x="897" y="110" textAnchor="middle"
        fontFamily={INTER} fontSize="7.5" fill="#aaa">≈ 3,000 sq ft</text>

      <text x="480" y="430" textAnchor="middle"
        fontFamily={SYNE} fontWeight="700" fontSize="14" fill={acc.cafe} letterSpacing="2">CAFE & CO-WORKING</text>
      <text x="480" y="447" textAnchor="middle"
        fontFamily={INTER} fontSize="9" fill={acc.cafe} fillOpacity="0.7">Central Hub · Open to All · Connects Every Space</text>
      <text x="480" y="461" textAnchor="middle"
        fontFamily={INTER} fontSize="7.5" fill="#aaa">≈ 3,500 sq ft</text>

      <text x="1040" y="410" textAnchor="middle"
        fontFamily={SYNE} fontWeight="700" fontSize="11" fill={acc.vault} letterSpacing="1.5">AUTOMOTIVE VAULT</text>
      <text x="1040" y="424" textAnchor="middle"
        fontFamily={INTER} fontSize="8" fill={acc.vault} fillOpacity="0.7">Secure Vehicle Storage</text>
      <text x="1040" y="437" textAnchor="middle"
        fontFamily={INTER} fontSize="7.5" fill="#aaa">≈ 2,800 sq ft</text>

      {/* ── ANNOTATIONS ── */}
      {/* Food & beverage zone bracket */}
      <text x="337" y="38" textAnchor="middle"
        fontFamily={INTER} fontSize="7.5" fill="#8a6a3a" letterSpacing="0.8">FOOD & BEVERAGE ZONE</text>
      <line x1="43" y1="43" x2="632" y2="43" stroke="#c47a3a" strokeWidth="0.8" strokeOpacity="0.5" />

      {/* Glass wall label rotated 90° */}
      <text transform="translate(908,580) rotate(-90)"
        textAnchor="middle" fontFamily={INTER} fontSize="7.5" fill="#4488bb" letterSpacing="0.8">
        GLASS VIEWING WALL
      </text>

      {/* Vehicle entry label */}
      <text x="1170" y="598" fontFamily={INTER} fontSize="7" fill="#666">VEHICLE</text>
      <text x="1170" y="608" fontFamily={INTER} fontSize="7" fill="#666">ENTRY</text>
      <line x1="1160" y1="600" x2="1168" y2="600" stroke="#666" strokeWidth="1" />

      {/* Main entry label */}
      <text x="494" y="780" textAnchor="middle"
        fontFamily={INTER} fontSize="8" fill="#555" letterSpacing="0.8">MAIN ENTRY</text>
      <line x1="494" y1="774" x2="494" y2="767" stroke="#555" strokeWidth="1" />

      {/* ── NORTH ARROW (top-right margin) ── */}
      <g transform="translate(1090,33)">
        <circle cx="0" cy="0" r="14" fill="none" stroke={WC} strokeWidth="1" />
        {/* North half — filled */}
        <polygon points="0,-10 5,4 0,0 -5,4" fill={WC} />
        {/* South half — white */}
        <polygon points="0,10 5,-4 0,0 -5,-4" fill="white" stroke={WC} strokeWidth="0.5" />
        <text x="0" y="-17" textAnchor="middle"
          fontFamily={SYNE} fontSize="9" fontWeight="700" fill={WC}>N</text>
      </g>

      {/* ── SCALE BAR ── */}
      <g transform="translate(462,790)">
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={i*50} y="0" width="50" height="7"
            fill={i%2===0 ? WC : 'white'} stroke={WC} strokeWidth="0.8" />
        ))}
        <text x="0"   y="18" textAnchor="middle" fontFamily={INTER} fontSize="7" fill={WC}>0</text>
        <text x="100" y="18" textAnchor="middle" fontFamily={INTER} fontSize="7" fill={WC}>25 ft</text>
        <text x="200" y="18" textAnchor="middle" fontFamily={INTER} fontSize="7" fill={WC}>50 ft</text>
        <text x="262" y="18" fontFamily={INTER} fontSize="7" fill="#888">(approx.)</text>
      </g>

      {/* ── LEGEND ── */}
      <g transform="translate(62,790)">
        <text x="0" y="0"
          fontFamily={INTER} fontSize="7.5" fontWeight="600" fill={WC} letterSpacing="1">LEGEND</text>
        <line x1="0" y1="4" x2="65" y2="4" stroke={WC} strokeWidth="0.6" />
        {/* Glass wall */}
        <line x1="0" y1="16" x2="22" y2="16" stroke="#4488bb" strokeWidth="2" strokeDasharray="5,3" />
        <text x="26" y="20" fontFamily={INTER} fontSize="7" fill="#555">Glass viewing wall</text>
        {/* Roller door */}
        <line x1="0" y1="30" x2="22" y2="30" stroke="#888" strokeWidth="2" strokeDasharray="3,2" />
        <text x="26" y="34" fontFamily={INTER} fontSize="7" fill="#555">Roller door / vehicle access</text>
        {/* Door swing */}
        <line x1="0" y1="43" x2="9" y2="43" stroke={WC} strokeWidth="1.2" />
        <path d="M9,43 A13,13 0 0,1 22,34" fill="none" stroke={WC} strokeWidth="1" strokeDasharray="3,2" />
        <text x="26" y="48" fontFamily={INTER} fontSize="7" fill="#555">Door swing</text>
      </g>

      {/* ── TITLE BLOCK ── */}
      <text x="600" y="810" textAnchor="middle"
        fontFamily={SYNE} fontSize="7.5" fill="#bbb" letterSpacing="2">
        THE COMPOUND — MASTER FLOOR PLAN — TOTAL ≈ 20,000 SQ FT — DUBAI
      </text>
    </svg>
  )
}

export default function FloorPlan() {
  return (
    <div className="bg-compound-surface min-h-screen">
      {/* Hero */}
      <section className="bg-compound-black pt-28 pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-compound-amber text-[11px] font-display font-700 tracking-widest2 uppercase mb-4">
            The Compound · Dubai
          </p>
          <h1 className="font-display font-800 text-3xl md:text-5xl tracking-tight text-compound-white mb-5">
            Master Floor Plan
          </h1>
          <p className="text-compound-concrete text-base md:text-lg max-w-2xl leading-relaxed">
            A 20,000 sq ft multi-purpose warehouse housing five independent spaces,
            connected by a central cafe and co-working hub. Each zone is purpose-built
            and acoustically separated — sharing only access, not atmosphere.
          </p>
        </div>
      </section>

      {/* SVG plan */}
      <section className="px-4 md:px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-compound-border shadow-sm p-3 md:p-6">
            <FloorPlanSVG />
          </div>
          <p className="mt-3 text-[11px] text-compound-steel text-right tracking-wide">
            Floor plan is illustrative. Dimensions and square footages are approximate.
          </p>
        </div>
      </section>

      {/* Zone index cards */}
      <section className="px-4 md:px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] font-display font-700 tracking-widest2 uppercase text-compound-steel mb-6">
            Spaces Within The Compound
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {zones.map(z => (
              <Link
                key={z.id}
                to={z.href}
                className="group flex flex-col bg-compound-white border border-compound-border hover:border-compound-amber/50 transition-colors duration-200 p-5"
              >
                <div className="w-8 h-1 mb-4 flex-shrink-0" style={{ background: z.accent }} />
                <p className="font-display font-700 text-[11px] tracking-widest uppercase text-compound-black mb-1 group-hover:text-compound-amber transition-colors">
                  {z.name}
                </p>
                <p className="text-[10px] text-compound-steel uppercase tracking-wide mb-3">{z.type}</p>
                <p className="text-[12px] text-compound-steel leading-relaxed flex-1">{z.desc}</p>
                <p className="mt-4 text-[10px] font-display font-600 tracking-widest uppercase"
                  style={{ color: z.accent }}>
                  {z.area}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-display font-600 tracking-widest uppercase text-compound-steel group-hover:text-compound-black transition-colors">
                  View Space
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                    fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Layout description */}
      <section className="border-t border-compound-border bg-compound-white px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-[11px] font-display font-700 tracking-widest2 uppercase text-compound-amber mb-4">
              Layout Logic
            </p>
            <h2 className="font-display font-800 text-2xl md:text-3xl tracking-tight text-compound-black mb-5">
              Purpose-built zones,<br />one connected address.
            </h2>
            <p className="text-compound-steel leading-relaxed mb-4">
              The north wing groups The Compound's food and office operations. Cucina Edit
              and Ghost Dinners Kitchen share a wall to enable collaboration between the
              two culinary teams, while Serveo Group occupies the full eastern half with
              private and open-plan offices separated by a partition.
            </p>
            <p className="text-compound-steel leading-relaxed">
              The Cafe & Co-working space runs the full south corridor — every north zone
              steps directly into it through a dedicated door. The Automotive Vault sits
              behind the east wall, fully enclosed but visually connected to the Cafe by
              a floor-to-ceiling glass panel.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                label: 'Food & Beverage Zone',
                color: '#c47a3a',
                text: "Cucina Edit and Ghost Dinners Kitchen are adjacent with shared access — two independent operators in complementary disciplines occupying The Compound's north-west corner.",
              },
              {
                label: 'Office Wing',
                color: '#1d4e8a',
                text: 'Serveo Group Offices span the full north-east quarter. Acoustically separated from the kitchen and cafe zones, they operate on independent HVAC with a private entry point.',
              },
              {
                label: 'Glass Viewing Wall',
                color: '#4488bb',
                text: 'The Automotive Vault is accessed via its own vehicle roller door on the east wall. A continuous glass partition faces the Cafe, letting members observe the collection without entering the vault.',
              },
            ].map(({ label, color, text }) => (
              <div key={label} className="flex gap-4">
                <div className="w-0.5 flex-shrink-0 self-stretch" style={{ backgroundColor: color }} />
                <div>
                  <p className="text-[11px] font-display font-700 tracking-wider uppercase mb-1.5"
                    style={{ color }}>
                    {label}
                  </p>
                  <p className="text-[13px] text-compound-steel leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
