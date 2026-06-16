const W = '#1a1a18'
const FT = 'Inter, sans-serif'

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
  return (
    <g transform={`translate(${x},${y})`}>
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={i * 40} y="0" width="40" height="6"
          fill={i % 2 === 0 ? W : 'white'} stroke={W} strokeWidth="0.6" />
      ))}
      {[0, 5, 10, 15, 20].map((label, i) => (
        <text key={label} x={i * 40} y="16" textAnchor="middle"
          fontFamily={FT} fontSize="7" fill="#888">{label}m</text>
      ))}
    </g>
  )
}

function Burner({ cx, cy }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="10" fill="none" stroke="#777" strokeWidth="1" />
      <circle cx={cx} cy={cy} r="5.5" fill="none" stroke="#aaa" strokeWidth="0.75" />
      <circle cx={cx} cy={cy} r="2" fill="#ccc" />
    </g>
  )
}

function CooktopStation({ x, y }) {
  return (
    <g>
      <rect x={x} y={y} width="95" height="62" rx="2" fill="#ede9e3" stroke="#555" strokeWidth="1.2" />
      <rect x={x + 4} y={y + 4} width="87" height="54" rx="1" fill="#e0dbd4" stroke="#888" strokeWidth="0.7" />
      <Burner cx={x + 24} cy={y + 18} />
      <Burner cx={x + 71} cy={y + 18} />
      <Burner cx={x + 24} cy={y + 46} />
      <Burner cx={x + 71} cy={y + 46} />
    </g>
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

export default function GhostDinnersFloorPlan() {
  // partition coords
  const vS = 510  // dev kitchen | right zone
  const hM = 310  // upper | lower zone
  const hC = 195  // walk-in | content studio (right zone)
  const vD = 228  // dry store | wash bay (left lower zone)

  // cooking station layout
  const cols = [68, 178, 288]
  const rowY = [130, 210]

  return (
    <svg viewBox="0 0 920 640" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto" aria-label="Ghost Dinners Development Kitchen architectural floor plan">

      <rect width="920" height="640" fill="white" />

      {/* ── ROOM FILLS ─────────────────────────────── */}
      <rect x="53" y="53" width="454" height="254" fill="#f9fdfb" />
      {/* walk-in has slightly cooler tint */}
      <rect x="513" y="53" width="354" height="139" fill="#f0f7fc" />
      <rect x="513" y="198" width="354" height="109" fill="#f7f7f5" />
      <rect x="53" y="313" width="172" height="262" fill="#f5f4f2" />
      <rect x="231" y="313" width="276" height="262" fill="#f4f8fb" />
      <rect x="513" y="313" width="354" height="262" fill="#f7f7f5" />

      {/* ── OUTER WALLS ────────────────────────────── */}
      <line x1="50" y1="50" x2="870" y2="50" stroke={W} strokeWidth="7" strokeLinecap="square" />
      <line x1="870" y1="50" x2="870" y2="578" stroke={W} strokeWidth="7" strokeLinecap="square" />
      {/* bottom: gap at x=718→768 for roller/main door in dispatch */}
      <line x1="50" y1="578" x2="718" y2="578" stroke={W} strokeWidth="7" strokeLinecap="square" />
      <line x1="768" y1="578" x2="870" y2="578" stroke={W} strokeWidth="7" strokeLinecap="square" />
      <line x1="50" y1="50" x2="50" y2="578" stroke={W} strokeWidth="7" strokeLinecap="square" />

      {/* ── INTERIOR PARTITIONS ────────────────────── */}
      {/* V-split: dev kitchen | right */}
      <line x1={vS} y1="50" x2={vS} y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      {/* H-mid, left zone: gaps at 132→182 (dry store door) and 344→394 (wash→kitchen door) */}
      <line x1="50" y1={hM} x2="132" y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      <line x1="182" y1={hM} x2="344" y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      <line x1="394" y1={hM} x2={vS} y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      {/* H-mid, right zone: gap at 540→590 (dev kitchen → dispatch shortcut) */}
      <line x1={vS} y1={hM} x2="540" y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      <line x1="590" y1={hM} x2="870" y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      {/* H-cold: walk-in | content studio (right zone) */}
      <line x1={vS} y1={hC} x2="870" y2={hC} stroke={W} strokeWidth="4" strokeLinecap="square" />
      {/* V-dry: dry store | wash bay (left lower) */}
      <line x1={vD} y1={hM} x2={vD} y2="578" stroke={W} strokeWidth="4" strokeLinecap="square" />

      {/* ── WALK-IN REFRIGERATION DOUBLE WALL ──────── */}
      {/* thick insulated wall indicated by inner liner */}
      <rect x="513" y="50" width="357" height="145" fill="none"
        stroke="#3a88c4" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="none" />
      <rect x="521" y="58" width="341" height="129" fill="none"
        stroke="#3a88c4" strokeWidth="0.75" strokeOpacity="0.2" />

      {/* ── DOOR SYMBOLS ───────────────────────────── */}
      {/* Door 1 – main/roller door south wall (x=718→768) */}
      {/* roller door drawn as parallel hatching */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
        <line key={i} x1={718 + i * 5} y1="571" x2={718 + i * 5} y2="585"
          stroke="#888" strokeWidth="0.8" />
      ))}
      <text x="743" y="595" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#888">ROLLER DOOR</text>

      {/* Door 2 – dry store → dev kitchen (H-mid left, x=132→182) */}
      <line x1="132" y1={hM} x2="132" y2="260" stroke={W} strokeWidth="1.5" />
      <path d="M182,310 A50,50 0 0,1 132,260" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* Door 3 – wash bay → dev kitchen (H-mid, x=344→394) */}
      <line x1="394" y1={hM} x2="394" y2="260" stroke={W} strokeWidth="1.5" />
      <path d="M344,310 A50,50 0 0,1 394,260" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* Door 4 – dev kitchen → dispatch shortcut (H-mid right, x=540→590) */}
      <line x1="540" y1={hM} x2="540" y2="360" stroke={W} strokeWidth="1.5" />
      <path d="M590,310 A50,50 0 0,1 540,360" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* Door 5 – walk-in access from dev kitchen (V-split, y=108→158) */}
      <line x1={vS} y1="108" x2="460" y2="108" stroke={W} strokeWidth="1.5" />
      <path d="M510,158 A50,50 0 0,0 460,108" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />
      {/* gap in V-split for door */}
      {/* Note: the vS line above draws from y=50 to y=310. The gap is y=108→158 */}
      {/* Re-draw V-split with gap */}

      {/* ── RE-DRAW V-SPLIT WITH WALK-IN DOOR GAP ── */}
      {/* (overwrite earlier full line with two segments + gap) */}
      <rect x="507" y="48" width="6" height={hM - 46} fill="white" />
      <line x1={vS} y1="50" x2={vS} y2="108" stroke={W} strokeWidth="5" strokeLinecap="square" />
      <line x1={vS} y1="158" x2={vS} y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />

      {/* ── COOKTOP STATIONS (3 × 2) ────────────────── */}
      {cols.map(cx => rowY.map(ry => (
        <CooktopStation key={`${cx}-${ry}`} x={cx} y={ry} />
      )))}

      {/* Chef's pass / plating counter */}
      <rect x="68" y="285" width="405" height="22" rx="2" fill="#d8d4ce" stroke="#555" strokeWidth="1.2" />
      <text x="270" y="300" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#777" letterSpacing="0.8">
        CHEF'S PASS / PLATING COUNTER
      </text>

      {/* Extraction canopy above stations (indicated as dashed rect) */}
      <rect x="64" y="126" width="406" height="130" fill="none"
        stroke="#aaa" strokeWidth="0.75" strokeDasharray="8,4" />
      <text x="267" y="119" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#bbb" letterSpacing="0.5">
        EXTRACTION CANOPY (ABOVE)
      </text>

      {/* ── WALK-IN REFRIGERATION UNITS ────────────── */}
      <rect x="526" y="68" width="148" height="50" rx="2" fill="#d8eef8" stroke="#5599cc" strokeWidth="1" />
      <text x="600" y="98" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#3a78aa">REFRIGERATION</text>
      <rect x="686" y="68" width="162" height="50" rx="2" fill="#c8e0f0" stroke="#4488bb" strokeWidth="1" />
      <text x="767" y="98" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#2a6088">FREEZER VAULT</text>
      {/* temperature labels */}
      <text x="600" y="110" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#5588aa">0°C to +5°C</text>
      <text x="767" y="110" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#4477aa">−18°C</text>

      {/* ── CONTENT STUDIO ──────────────────────────── */}
      <rect x="530" y="210" width="315" height="80" rx="3"
        fill="#eeeef6" stroke="#8888aa" strokeWidth="1" strokeDasharray="6,3" />
      <text x="687" y="256" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#7777aa">SHOOTING SURFACE</text>
      {/* overhead rig indicator */}
      <rect x="530" y="200" width="315" height="4" rx="1" fill="#aaaacc" />
      <text x="687" y="207" textAnchor="middle" fontFamily={FT} fontSize="6.5" fill="#9999bb">OVERHEAD RIG</text>

      {/* ── DRY STORE SHELVING ──────────────────────── */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <rect key={i} x="68" y={322 + i * 32} width="148" height="22" rx="1"
          fill="#e8e5e0" stroke="#aaa" strokeWidth="0.75" />
      ))}

      {/* ── WASH BAY ────────────────────────────────── */}
      {/* triple sink */}
      <Sink x="248" y="325" />
      <Sink x="304" y="325" />
      <Sink x="360" y="325" />
      {/* commercial dishwasher */}
      <rect x="248" y="374" width="64" height="60" rx="2" fill="#d8d4ce" stroke="#777" strokeWidth="1" />
      <text x="280" y="408" textAnchor="middle" fontFamily={FT} fontSize="6.5" fill="#888">D/W</text>
      {/* pot wash counter */}
      <rect x="248" y="440" width="254" height="100" rx="2" fill="#e2ddd8" stroke="#999" strokeWidth="0.75" />
      <text x="375" y="494" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#888">POT WASH COUNTER</text>

      {/* ── DISPATCH & PACKAGING ────────────────────── */}
      {/* packing tables */}
      <rect x="528" y="338" width="320" height="48" rx="2" fill="#e2ddd8" stroke="#555" strokeWidth="1.2" />
      <text x="688" y="367" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#666">PACKING / LABELLING TABLE</text>
      <rect x="528" y="404" width="320" height="48" rx="2" fill="#e2ddd8" stroke="#555" strokeWidth="1.2" />
      <text x="688" y="433" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#666">COLD BAG STAGING TABLE</text>

      {/* ── ROOM LABELS ─────────────────────────────── */}
      <text x="278" y="72" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="10.5"
        fill={W} letterSpacing="1.5">DEVELOPMENT KITCHEN</text>
      <text x="278" y="87" textAnchor="middle" fontFamily={FT} fontSize="8.5" fill="#888">
        6 commercial stations · full extraction · ≈ 92 m²
      </text>

      <text x="688" y="170" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill={W} letterSpacing="1.5">WALK-IN REFRIGERATION</text>
      <text x="688" y="184" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">
        cold storage · freezer vault · ≈ 38 m²
      </text>

      <text x="688" y="208" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill={W} letterSpacing="1.5">CONTENT STUDIO</text>
      <text x="688" y="220" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">
        photo · video · overhead rig · ≈ 28 m²
      </text>

      <text x="138" y="495" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9"
        fill={W} letterSpacing="1">DRY STORE</text>
      <text x="138" y="507" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">≈ 18 m²</text>

      <text x="368" y="480" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9"
        fill={W} letterSpacing="1">WASH BAY</text>
      <text x="368" y="492" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">
        triple sink · dishwasher · ≈ 36 m²
      </text>

      <text x="688" y="490" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill={W} letterSpacing="1.5">DISPATCH & PACKAGING</text>
      <text x="688" y="504" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">
        fulfilment · labelling · cold-bag staging · ≈ 58 m²
      </text>

      {/* ── DIMENSION ANNOTATIONS ──────────────────── */}
      <line x1="50" y1="36" x2="870" y2="36" stroke="#ccc" strokeWidth="0.75" />
      <line x1="50" y1="32" x2="50" y2="40" stroke="#ccc" strokeWidth="0.75" />
      <line x1="870" y1="32" x2="870" y2="40" stroke="#ccc" strokeWidth="0.75" />
      <text x="460" y="33" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#bbb">≈ 20 m</text>
      <line x1="36" y1="50" x2="36" y2="578" stroke="#ccc" strokeWidth="0.75" />
      <line x1="32" y1="50" x2="40" y2="50" stroke="#ccc" strokeWidth="0.75" />
      <line x1="32" y1="578" x2="40" y2="578" stroke="#ccc" strokeWidth="0.75" />
      <text x="32" y="316" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#bbb"
        transform="rotate(-90,32,316)">≈ 13 m</text>

      {/* ── NORTH ARROW ─────────────────────────────── */}
      <NorthArrow cx={885} cy={26} />

      {/* ── SCALE BAR ────────────────────────────────── */}
      <ScaleBar x={50} y={596} />

      {/* ── LEGEND ──────────────────────────────────── */}
      <g transform="translate(330,593)">
        <line x1="0" y1="0" x2="0" y2="-18" stroke={W} strokeWidth="1.5" />
        <path d="M18,0 A18,18 0 0,0 0,-18" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="3,2" />
        <text x="24" y="-2" fontFamily={FT} fontSize="7" fill="#888">Door swing</text>
        <line x1="100" y1="-4" x2="148" y2="-4" stroke={W} strokeWidth="5" />
        <text x="154" y="-2" fontFamily={FT} fontSize="7" fill="#888">Wall</text>
        <rect x="220" y="-14" width="28" height="12" fill="none"
          stroke="#aaa" strokeWidth="0.75" strokeDasharray="4,2" />
        <text x="254" y="-2" fontFamily={FT} fontSize="7" fill="#888">Overhead element</text>
      </g>

      {/* ── TITLE BLOCK ──────────────────────────────── */}
      <text x="460" y="632" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#ccc" letterSpacing="2">
        GHOST DINNERS DEVELOPMENT KITCHEN — FLOOR PLAN — ILLUSTRATIVE, NOT TO SCALE
      </text>
    </svg>
  )
}
