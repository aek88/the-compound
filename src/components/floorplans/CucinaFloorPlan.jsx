const W = '#1a1a18'
const FT = 'Inter, sans-serif'

// ── shared micro-components ────────────────────────────────────────────────────

function NorthArrow({ cx, cy }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <circle r="14" fill="white" stroke="#bbb" strokeWidth="0.75" />
      <path d="M0,-11 L4.5,3 L0,0 Z" fill={W} />
      <path d="M0,-11 L-4.5,3 L0,0 Z" fill="white" stroke={W} strokeWidth="0.6" />
      <path d="M0,0 L4.5,3 L0,11 L-4.5,3 Z" fill="white" stroke={W} strokeWidth="0.6" />
      <text y="-18" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9" fill={W}>N</text>
    </g>
  )
}

function ScaleBar({ x, y }) {
  const segs = [0, 1, 2, 3]
  return (
    <g transform={`translate(${x},${y})`}>
      {segs.map(i => (
        <rect key={i} x={i * 40} y="0" width="40" height="6"
          fill={i % 2 === 0 ? W : 'white'}
          stroke={W} strokeWidth="0.6" />
      ))}
      {[0, 5, 10, 15, 20].map((label, i) => (
        <text key={label} x={i * 40} y="16" textAnchor="middle"
          fontFamily={FT} fontSize="7" fill="#888">{label}m</text>
      ))}
    </g>
  )
}

function DoorSwing({ x1, y1, x2, y2, arcX, arcY }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={W} strokeWidth="1.5" />
      <path d={`M${arcX},${arcY} A50,50 0 0,${arcX < x1 ? 0 : 1} ${x2},${y2}`}
        fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />
    </g>
  )
}

function Shelf({ x, y, w }) {
  return (
    <rect x={x} y={y} width={w} height="12" rx="1"
      fill="#e8e5e0" stroke="#aaa" strokeWidth="0.75" />
  )
}

function Sink({ x, y }) {
  return (
    <g>
      <rect x={x} y={y} width="46" height="37" rx="3"
        fill="#ddeaf0" stroke="#555" strokeWidth="1.2" />
      <rect x={x + 5} y={y + 5} width="36" height="22" rx="2"
        fill="#c4d8e4" stroke="#888" strokeWidth="0.7" />
      <circle cx={x + 23} cy={y + 16} r="3.5" fill="#9abbc8" />
    </g>
  )
}

// ── main component ─────────────────────────────────────────────────────────────

export default function CucinaFloorPlan() {
  // partition coords (center lines)
  const vS = 550   // vertical split: workshop | right zone
  const hM = 348   // horizontal mid: upper | lower zone
  const hC = 210   // content studio | tasting (right zone)
  const hP = 420   // prep | storage+wash (left lower zone)
  const vW = 245   // storage | wash station (left lower zone)

  // pasta station helper
  const cols = [80, 213, 346]
  const rows = [118, 196]

  return (
    <svg viewBox="0 0 920 610" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto" aria-label="Cucina Edit architectural floor plan">

      {/* white sheet */}
      <rect width="920" height="610" fill="white" />

      {/* ── ROOM FILLS ─────────────────────────────── */}
      <rect x="53" y="53" width="494" height="292" fill="#fffef9" />
      <rect x="553" y="53" width="314" height="154" fill="#f8f9fd" />
      <rect x="553" y="213" width="314" height="132" fill="#fdfbf6" />
      <rect x="53" y="351" width="489" height="66" fill="#f7f6f4" />
      <rect x="53" y="423" width="189" height="122" fill="#f5f4f2" />
      <rect x="248" y="351" width="299" height="194" fill="#f4f8fb" />
      <rect x="553" y="351" width="314" height="194" fill="#f7f7f5" />

      {/* ── OUTER WALLS ────────────────────────────── */}
      <line x1="50" y1="50" x2="870" y2="50" stroke={W} strokeWidth="7" strokeLinecap="square" />
      <line x1="870" y1="50" x2="870" y2="548" stroke={W} strokeWidth="7" strokeLinecap="square" />
      {/* bottom: gap at x=672→722 for main entry */}
      <line x1="50" y1="548" x2="672" y2="548" stroke={W} strokeWidth="7" strokeLinecap="square" />
      <line x1="722" y1="548" x2="870" y2="548" stroke={W} strokeWidth="7" strokeLinecap="square" />
      <line x1="50" y1="50" x2="50" y2="548" stroke={W} strokeWidth="7" strokeLinecap="square" />

      {/* ── INTERIOR PARTITIONS ────────────────────── */}
      {/* V-split: workshop | right */}
      <line x1={vS} y1="50" x2={vS} y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      {/* H-mid left zone: gap at 202→252 (Door 3) */}
      <line x1="50" y1={hM} x2="202" y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      <line x1="252" y1={hM} x2={vS} y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      {/* H-mid right zone: gap at 638→688 (Door 2) */}
      <line x1={vS} y1={hM} x2="638" y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      <line x1="688" y1={hM} x2="870" y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      {/* H-content vs tasting: gap at 742→792 (Door 4) */}
      <line x1={vS} y1={hC} x2="742" y2={hC} stroke={W} strokeWidth="4" strokeLinecap="square" />
      <line x1="792" y1={hC} x2="870" y2={hC} stroke={W} strokeWidth="4" strokeLinecap="square" />
      {/* H-prep vs storage/wash */}
      <line x1="50" y1={hP} x2={vS} y2={hP} stroke={W} strokeWidth="4" strokeLinecap="square" />
      {/* V-wash: storage | wash */}
      <line x1={vW} y1={hM} x2={vW} y2="548" stroke={W} strokeWidth="4" strokeLinecap="square" />

      {/* ── DOOR SYMBOLS ───────────────────────────── */}
      {/* Door 1 – main entry south wall (x=672→722) */}
      <line x1="672" y1="548" x2="672" y2="498" stroke={W} strokeWidth="1.5" />
      <path d="M722,548 A50,50 0 0,0 672,498" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* Door 2 – tasting → entry (H-mid right zone x=638→688) */}
      <line x1="638" y1={hM} x2="638" y2="398" stroke={W} strokeWidth="1.5" />
      <path d="M688,348 A50,50 0 0,1 638,398" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* Door 3 – prep → workshop (H-mid left zone x=202→252) */}
      <line x1="252" y1={hM} x2="252" y2="298" stroke={W} strokeWidth="1.5" />
      <path d="M202,348 A50,50 0 0,1 252,298" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* Door 4 – content studio → tasting (H-content x=742→792) */}
      <line x1="792" y1={hC} x2="792" y2="160" stroke={W} strokeWidth="1.5" />
      <path d="M742,210 A50,50 0 0,1 792,160" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* ── PASTA STATIONS (3 × 2 grid) ────────────── */}
      {cols.map(cx => rows.map(ry => (
        <g key={`${cx}-${ry}`}>
          <rect x={cx} y={ry} width="108" height="56" rx="2" fill="#ede9e3" stroke="#555" strokeWidth="1.2" />
          <rect x={cx + 5} y={ry + 5} width="98" height="38" rx="1" fill="#e0dbd4" stroke="#888" strokeWidth="0.7" />
          {/* rolling-pin lines */}
          <line x1={cx + 20} y1={ry + 18} x2={cx + 88} y2={ry + 18} stroke="#999" strokeWidth="1.5" />
          <line x1={cx + 20} y1={ry + 24} x2={cx + 88} y2={ry + 24} stroke="#ccc" strokeWidth="0.75" />
          <line x1={cx + 20} y1={ry + 30} x2={cx + 88} y2={ry + 30} stroke="#999" strokeWidth="1.5" />
          {/* stool circle */}
          <circle cx={cx + 54} cy={ry + 50} r="4.5" fill="none" stroke="#aaa" strokeWidth="0.75" />
        </g>
      )))}

      {/* Chef's pass counter */}
      <rect x="74" y="308" width="450" height="28" rx="2" fill="#d8d4ce" stroke="#555" strokeWidth="1.2" />
      <text x="299" y="326" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#777" letterSpacing="0.8">CHEF'S PASS / DEMO COUNTER</text>

      {/* ── CONTENT STUDIO FURNITURE ────────────────── */}
      <rect x="574" y="68" width="268" height="108" rx="3"
        fill="#eeeef7" stroke="#8888bb" strokeWidth="1" strokeDasharray="6,3" />
      <text x="708" y="120" textAnchor="middle" fontFamily={FT} fontSize="8.5" fill="#7777aa">SHOOTING SURFACE</text>
      {/* camera tripod */}
      <line x1="708" y1="100" x2="698" y2="84" stroke="#8888bb" strokeWidth="1.2" />
      <line x1="708" y1="100" x2="718" y2="84" stroke="#8888bb" strokeWidth="1.2" />
      <line x1="698" y1="84" x2="718" y2="84" stroke="#8888bb" strokeWidth="1" />
      <circle cx="708" cy="80" r="6" fill="none" stroke="#8888bb" strokeWidth="1.2" />
      {/* backdrop rail at right wall */}
      <rect x="852" y="60" width="10" height="130" rx="1" fill="#dddde8" stroke="#bbb" strokeWidth="0.75" />

      {/* ── TASTING TABLE + CHAIRS ──────────────────── */}
      <ellipse cx="710" cy="282" rx="120" ry="22" fill="#e6e1db" stroke="#555" strokeWidth="1.5" />
      {[-84, -48, -8, 34, 72].map(dx => (
        <rect key={`ct${dx}`} x={710 + dx - 12} y="252" width="24" height="10" rx="2"
          fill="#cdc8c2" stroke="#888" strokeWidth="0.75" />
      ))}
      {[-84, -48, -8, 34, 72].map(dx => (
        <rect key={`cb${dx}`} x={710 + dx - 12} y="296" width="24" height="10" rx="2"
          fill="#cdc8c2" stroke="#888" strokeWidth="0.75" />
      ))}
      <rect x="581" y="276" width="10" height="14" rx="2" fill="#cdc8c2" stroke="#888" strokeWidth="0.75" />
      <rect x="836" y="276" width="10" height="14" rx="2" fill="#cdc8c2" stroke="#888" strokeWidth="0.75" />

      {/* ── PREP & PLATING COUNTER ──────────────────── */}
      <rect x="68" y="360" width="468" height="46" rx="2" fill="#d8d4ce" stroke="#555" strokeWidth="1.2" />
      <text x="302" y="387" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#666" letterSpacing="0.5">PREP & PLATING COUNTER</text>

      {/* ── STORAGE SHELVING ────────────────────────── */}
      {[0, 1, 2, 3, 4].map(i => (
        <Shelf key={i} x="68" y={432 + i * 18} w="164" />
      ))}

      {/* ── WASH STATION ────────────────────────────── */}
      <Sink x="262" y="362" />
      <Sink x="318" y="362" />
      {/* counter surface */}
      <rect x="255" y="408" width="283" height="122" rx="2" fill="#e2ddd8" stroke="#888" strokeWidth="0.75" />
      {/* commercial dishwasher */}
      <rect x="262" y="415" width="55" height="55" rx="2" fill="#d8d4ce" stroke="#777" strokeWidth="1" />
      <text x="289" y="446" textAnchor="middle" fontFamily={FT} fontSize="6.5" fill="#888">D/W</text>

      {/* ── ROOM LABELS ─────────────────────────────── */}
      {/* Main Workshop */}
      <text x="297" y="74" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="10.5"
        fill={W} letterSpacing="1.5">MAIN WORKSHOP</text>
      <text x="297" y="89" textAnchor="middle" fontFamily={FT} fontSize="8.5" fill="#888">
        6 pasta stations · marble countertops · ≈ 95 m²
      </text>

      {/* Content Studio */}
      <text x="708" y="192" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill={W} letterSpacing="1.5">CONTENT STUDIO</text>
      <text x="708" y="205" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">
        photography · overhead rig · ≈ 33 m²
      </text>

      {/* Tasting & Dining */}
      <text x="708" y="225" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill={W} letterSpacing="1.5">TASTING & DINING</text>
      <text x="708" y="238" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">
        private dining · up to 10 guests · ≈ 28 m²
      </text>

      {/* Prep label */}
      <text x="297" y="356" textAnchor="middle" fontFamily={FT} fontWeight="600" fontSize="8.5"
        fill="#666" letterSpacing="0.8">PREP & PLATING</text>

      {/* Storage */}
      <text x="148" y="533" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9"
        fill={W} letterSpacing="1">STORAGE</text>
      <text x="148" y="546" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">& PANTRY</text>

      {/* Wash Station */}
      <text x="397" y="472" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9"
        fill={W} letterSpacing="1">WASH STATION</text>
      <text x="397" y="484" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">
        double sink · dishwasher
      </text>

      {/* Entry */}
      <text x="708" y="453" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill="#999" letterSpacing="1.2">ENTRY &</text>
      <text x="708" y="468" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill="#999" letterSpacing="1.2">CIRCULATION</text>
      <text x="708" y="483" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#bbb">
        access from The Compound Cafe
      </text>

      {/* ── DIMENSION ANNOTATIONS ──────────────────── */}
      {/* width overall */}
      <line x1="50" y1="36" x2="870" y2="36" stroke="#ccc" strokeWidth="0.75" />
      <line x1="50" y1="32" x2="50" y2="40" stroke="#ccc" strokeWidth="0.75" />
      <line x1="870" y1="32" x2="870" y2="40" stroke="#ccc" strokeWidth="0.75" />
      <text x="460" y="33" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#bbb">≈ 20 m</text>
      {/* height overall */}
      <line x1="36" y1="50" x2="36" y2="548" stroke="#ccc" strokeWidth="0.75" />
      <line x1="32" y1="50" x2="40" y2="50" stroke="#ccc" strokeWidth="0.75" />
      <line x1="32" y1="548" x2="40" y2="548" stroke="#ccc" strokeWidth="0.75" />
      <text x="32" y="302" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#bbb"
        transform="rotate(-90,32,302)">≈ 12 m</text>

      {/* ── NORTH ARROW ─────────────────────────────── */}
      <NorthArrow cx={885} cy={26} />

      {/* ── SCALE BAR ────────────────────────────────── */}
      <ScaleBar x={50} y={567} />

      {/* ── LEGEND ──────────────────────────────────── */}
      <g transform="translate(330,564)">
        <line x1="0" y1="0" x2="0" y2="-18" stroke={W} strokeWidth="1.5" />
        <path d="M18,0 A18,18 0 0,0 0,-18" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="3,2" />
        <text x="24" y="-2" fontFamily={FT} fontSize="7" fill="#888">Door swing</text>
        <line x1="100" y1="-4" x2="148" y2="-4" stroke={W} strokeWidth="5" />
        <text x="154" y="-2" fontFamily={FT} fontSize="7" fill="#888">Wall</text>
      </g>

      {/* ── TITLE BLOCK ──────────────────────────────── */}
      <text x="460" y="603" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#ccc" letterSpacing="2">
        CUCINA EDIT — FLOOR PLAN — ILLUSTRATIVE, NOT TO SCALE
      </text>
    </svg>
  )
}
