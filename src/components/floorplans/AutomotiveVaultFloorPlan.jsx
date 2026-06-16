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

// top-down supercar silhouette — car parked nose-up (front toward top of SVG)
function Car({ x, y, label, accent }) {
  const bx = x + 10  // body left
  const bw = 36      // body width
  return (
    <g>
      {/* rear wheels */}
      <rect x={x} y={y + 96} width="10" height="20" rx="2" fill="#3a3a38" />
      <rect x={x + 46} y={y + 96} width="10" height="20" rx="2" fill="#3a3a38" />
      {/* front wheels */}
      <rect x={x} y={y + 14} width="10" height="20" rx="2" fill="#3a3a38" />
      <rect x={x + 46} y={y + 14} width="10" height="20" rx="2" fill="#3a3a38" />
      {/* body */}
      <rect x={bx} y={y} width={bw} height="130" rx="7" fill="#e2dfda" stroke="#444" strokeWidth="1.2" />
      {/* windscreen */}
      <rect x={bx + 4} y={y + 20} width={bw - 8} height="24" rx="3" fill="#c0cdd8" stroke="#888" strokeWidth="0.6" />
      {/* cabin roof hint */}
      <rect x={bx + 6} y={y + 46} width={bw - 12} height="36" rx="2" fill="#d8d4ce" stroke="#aaa" strokeWidth="0.5" />
      {/* rear screen */}
      <rect x={bx + 4} y={y + 84} width={bw - 8} height="18" rx="2" fill="#c0cdd8" stroke="#888" strokeWidth="0.6" />
      {/* accent stripe */}
      <rect x={bx + 14} y={y} width="8" height="130" rx="4" fill={accent} fillOpacity="0.35" />
      {/* number plate label */}
      <text x={x + 28} y={y + 145} textAnchor="middle" fontFamily={FT} fontSize="6" fill="#999">
        {label}
      </text>
    </g>
  )
}

export default function AutomotiveVaultFloorPlan() {
  // partition coords
  const vG  = 715   // main vault | glass viewing gallery
  const hR  = 178   // upper utilities | main vault
  const hD  = 418   // main vault | detail bay
  const vE  = 338   // reception | equipment store (upper zone only)

  // car positions: 4 cars on floor level, all parked nose-up (front toward top)
  // each car silhouette: 56px wide, 130px tall (plus wheel pads)
  const carXPositions = [72, 172, 272, 372]  // left edge of each car (within 56px total inc wheels)
  const carY = 212  // top of car (front bumper)
  const accent = '#3a5a72'

  // lift bay: x=470→660, y=198→410
  const liftX = 470
  const liftY = 198
  const liftW = 186
  const liftH = 212

  return (
    <svg viewBox="0 0 920 620" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto" aria-label="Automotive Vault architectural floor plan">

      <rect width="920" height="620" fill="white" />

      {/* ── ROOM FILLS ─────────────────────────────── */}
      {/* Reception */}
      <rect x="53" y="53" width="282" height="122" fill="#f7f7f5" />
      {/* Equipment Store */}
      <rect x="341" y="53" width="371" height="122" fill="#f5f5f3" />
      {/* Main Vault */}
      <rect x="53" y="181" width="659" height="234" fill="#f9f8f6" />
      {/* Detail Bay */}
      <rect x="53" y="421" width="659" height="124" fill="#f4f8fb" />
      {/* Glass Gallery */}
      <rect x="718" y="53" width="149" height="492" fill="#edf4fa" />

      {/* ── GLASS GALLERY TEXTURE ───────────────────── */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => (
        <line key={i} x1="718" y1={53 + i * 32} x2="867" y2={53 + i * 32}
          stroke="#88aacc" strokeWidth="0.6" strokeOpacity="0.4" />
      ))}
      {/* Glass wall marker line */}
      <line x1="718" y1="53" x2="718" y2="545"
        stroke="#5588bb" strokeWidth="1.5" strokeDasharray="8,4" />

      {/* ── OUTER WALLS ────────────────────────────── */}
      <line x1="50" y1="50" x2="867" y2="50" stroke={W} strokeWidth="7" strokeLinecap="square" />
      <line x1="867" y1="50" x2="867" y2="545" stroke={W} strokeWidth="7" strokeLinecap="square" />
      {/* bottom: gap at x=130→390 for main roller door */}
      <line x1="50" y1="545" x2="130" y2="545" stroke={W} strokeWidth="7" strokeLinecap="square" />
      <line x1="390" y1="545" x2="867" y2="545" stroke={W} strokeWidth="7" strokeLinecap="square" />
      <line x1="50" y1="50" x2="50" y2="545" stroke={W} strokeWidth="7" strokeLinecap="square" />

      {/* ── INTERIOR PARTITIONS ────────────────────── */}
      {/* H-reception: utilities | vault (y=178) */}
      <line x1="50" y1={hR} x2={vG} y2={hR} stroke={W} strokeWidth="5" strokeLinecap="square" />
      {/* H-detail: vault | detail bay (y=418, with door gap at x=530→580) */}
      <line x1="50" y1={hD} x2="530" y2={hD} stroke={W} strokeWidth="5" strokeLinecap="square" />
      <line x1="580" y1={hD} x2={vG} y2={hD} stroke={W} strokeWidth="5" strokeLinecap="square" />
      {/* V-equip: reception | equipment (x=338, upper zone only y=50→178) */}
      <line x1={vE} y1="50" x2={vE} y2={hR} stroke={W} strokeWidth="4" strokeLinecap="square" />

      {/* V-glass: vault | glass gallery — drawn as lighter line (glass wall symbol) */}
      <line x1={vG} y1="50" x2={vG} y2="545" stroke="#3366aa" strokeWidth="3"
        strokeLinecap="square" strokeDasharray="none" />
      {/* Double-line glass wall detail */}
      <line x1={vG + 4} y1="53" x2={vG + 4} y2="542" stroke="#5588cc" strokeWidth="1" strokeOpacity="0.5" />

      {/* ── DOOR SYMBOLS ───────────────────────────── */}
      {/* Roller door at bottom wall (main vehicle access, x=130→390, 260px wide) */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(i => (
        <line key={i} x1={130 + i * 13} y1="537" x2={130 + i * 13} y2="553"
          stroke="#888" strokeWidth="0.9" />
      ))}
      <text x="260" y="562" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#888">
        VEHICLE ROLLER DOOR (APPROX. 6.5m)
      </text>

      {/* Door: vault → detail bay (H-detail, x=530→580) */}
      <line x1="530" y1={hD} x2="530" y2="468" stroke={W} strokeWidth="1.5" />
      <path d="M580,418 A50,50 0 0,1 530,468" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* Door: reception → vault (H-reception, x=132→182) */}
      <line x1="182" y1={hR} x2="182" y2="228" stroke={W} strokeWidth="1.5" />
      <path d="M132,178 A50,50 0 0,1 182,228" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* Door: reception → equipment (V-equip, y=88→138) */}
      <line x1={vE} y1="50" x2={vE} y2={hR} stroke={W} strokeWidth="4" strokeLinecap="square" />
      {/* re-draw with door gap at y=88→138 */}
      <rect x="335" y="48" width="6" height={hR - 46} fill="white" />
      <line x1={vE} y1="50" x2={vE} y2="88" stroke={W} strokeWidth="4" strokeLinecap="square" />
      <line x1={vE} y1="138" x2={vE} y2={hR} stroke={W} strokeWidth="4" strokeLinecap="square" />
      <line x1={vE} y1="88" x2={vE - 50} y2="88" stroke={W} strokeWidth="1.5" />
      <path d={`M${vE},138 A50,50 0 0,1 ${vE - 50},88`} fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* ── RECEPTION FURNITURE ─────────────────────── */}
      {/* L-shaped desk */}
      <rect x="68" y="68" width="148" height="36" rx="2" fill="#d8d4ce" stroke="#555" strokeWidth="1.2" />
      <rect x="195" y="68" width="36" height="90" rx="2" fill="#d8d4ce" stroke="#555" strokeWidth="1.2" />
      <text x="141" y="91" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#666">RECEPTION DESK</text>
      {/* Chair */}
      <circle cx="141" cy="120" r="8" fill="none" stroke="#aaa" strokeWidth="0.75" />

      {/* ── EQUIPMENT / TYRE STORE ──────────────────── */}
      {/* Shelving units */}
      {[0, 1, 2].map(i => (
        <rect key={i} x={355 + i * 115} y="68" width="100" height="100" rx="2"
          fill="#e8e5e0" stroke="#999" strokeWidth="0.75" />
      ))}
      <text x="353" y="143" fontFamily={FT} fontSize="7" fill="#aaa">SHELVING / TYRE RACKS</text>
      {/* Tyre indicators: small circles */}
      {[355, 470, 585].map(sx => (
        [0, 1, 2].map(i => (
          <circle key={`${sx}-${i}`} cx={sx + 20 + i * 28} cy="100" r="10"
            fill="#555" fillOpacity="0.3" stroke="#666" strokeWidth="0.75" />
        ))
      ))}

      {/* ── CAR LIFT BAY (inside main vault) ────────── */}
      {/* Lift platform area */}
      <rect x={liftX} y={liftY} width={liftW} height={liftH} rx="3"
        fill="#e8e8f0" stroke="#7788bb" strokeWidth="1.2" />
      {/* Cross-hatch to indicate lift */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <line key={`lh${i}`} x1={liftX} y1={liftY + i * 30}
          x2={liftX + i * 30 < liftW ? liftX + i * 30 : liftX + liftW}
          y2={liftY + i * 30 < liftW ? liftY : liftY + i * 30 - liftW}
          stroke="#9999cc" strokeWidth="0.6" strokeOpacity="0.5" />
      ))}
      {/* Lift column indicators */}
      <circle cx={liftX + 14} cy={liftY + 14} r="6" fill="#5566aa" fillOpacity="0.6" />
      <circle cx={liftX + liftW - 14} cy={liftY + 14} r="6" fill="#5566aa" fillOpacity="0.6" />
      <circle cx={liftX + 14} cy={liftY + liftH - 14} r="6" fill="#5566aa" fillOpacity="0.6" />
      <circle cx={liftX + liftW - 14} cy={liftY + liftH - 14} r="6" fill="#5566aa" fillOpacity="0.6" />
      {/* Up-down arrows */}
      <line x1={liftX + liftW / 2} y1={liftY + 70} x2={liftX + liftW / 2} y2={liftY + 142}
        stroke="#7788bb" strokeWidth="1.5" />
      <path d={`M${liftX + liftW / 2 - 8},${liftY + 84} L${liftX + liftW / 2},${liftY + 70} L${liftX + liftW / 2 + 8},${liftY + 84}`}
        fill="none" stroke="#7788bb" strokeWidth="1.5" />
      <path d={`M${liftX + liftW / 2 - 8},${liftY + 128} L${liftX + liftW / 2},${liftY + 142} L${liftX + liftW / 2 + 8},${liftY + 128}`}
        fill="none" stroke="#7788bb" strokeWidth="1.5" />
      <text x={liftX + liftW / 2} y={liftY + 112} textAnchor="middle"
        fontFamily={FT} fontSize="7" fill="#7788bb">LIFT</text>

      {/* ── 4 CARS ON FLOOR LEVEL ───────────────────── */}
      {carXPositions.map((cx, idx) => (
        <Car key={idx} x={cx} y={carY} label={`BAY ${idx + 1}`} accent={accent} />
      ))}

      {/* ── DETAIL & WASH BAY ────────────────────────── */}
      {/* Drain channel */}
      <rect x="65" y="428" width="4" height="108" rx="2" fill="#aaccdd" stroke="#88aacc" strokeWidth="0.75" />
      {/* Wash hose coil indicator */}
      <circle cx="110" cy="462" r="14" fill="none" stroke="#88aacc" strokeWidth="1" strokeDasharray="4,2" />
      <text x="110" y="466" textAnchor="middle" fontFamily={FT} fontSize="6.5" fill="#88aacc">HOSE</text>
      {/* Drain grate */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <line key={i} x1="80" y1={428 + i * 16} x2="80" y2={428 + i * 16 + 10}
          stroke="#aaccdd" strokeWidth="2" />
      ))}
      {/* Detail cart */}
      <rect x="155" y="430" width="62" height="44" rx="2" fill="#ddd9d3" stroke="#777" strokeWidth="1" />
      <text x="186" y="456" textAnchor="middle" fontFamily={FT} fontSize="6.5" fill="#888">DETAIL<tspan x="186" dy="10">CART</tspan></text>

      {/* ── GLASS VIEWING GALLERY LABEL ─────────────── */}
      <text x="793" y="300" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9"
        fill="#4477aa" letterSpacing="1" transform="rotate(-90,793,300)">
        GLASS VIEWING GALLERY
      </text>
      <text x="793" y="344" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#6699bb"
        transform="rotate(-90,793,344)">floor-to-ceiling glazing</text>

      {/* ── ROOM LABELS ─────────────────────────────── */}
      {/* Reception */}
      <text x="190" y="153" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill={W} letterSpacing="1.5">RECEPTION</text>
      <text x="190" y="166" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">& CHECK-IN</text>

      {/* Equipment Store */}
      <text x="530" y="145" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill={W} letterSpacing="1.5">EQUIPMENT & TYRE STORE</text>

      {/* Main Vault */}
      <text x="383" y="192" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="11"
        fill={W} letterSpacing="2">VEHICLE STORAGE VAULT</text>
      <text x="383" y="207" textAnchor="middle" fontFamily={FT} fontSize="8.5" fill="#888">
        4 floor bays + 1 hydraulic car lift · climate controlled · ≈ 170 m²
      </text>

      {/* Detail Bay */}
      <text x="383" y="433" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill={W} letterSpacing="1.5">DETAIL & WASH BAY</text>
      <text x="383" y="447" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">
        pressure wash · detail equipment · drain channel
      </text>

      {/* ── DIMENSION ANNOTATIONS ──────────────────── */}
      <line x1="50" y1="36" x2="867" y2="36" stroke="#ccc" strokeWidth="0.75" />
      <line x1="50" y1="32" x2="50" y2="40" stroke="#ccc" strokeWidth="0.75" />
      <line x1="867" y1="32" x2="867" y2="40" stroke="#ccc" strokeWidth="0.75" />
      <text x="458" y="33" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#bbb">≈ 20 m</text>
      <line x1="36" y1="50" x2="36" y2="545" stroke="#ccc" strokeWidth="0.75" />
      <line x1="32" y1="50" x2="40" y2="50" stroke="#ccc" strokeWidth="0.75" />
      <line x1="32" y1="545" x2="40" y2="545" stroke="#ccc" strokeWidth="0.75" />
      <text x="32" y="300" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#bbb"
        transform="rotate(-90,32,300)">≈ 12 m</text>

      {/* ── NORTH ARROW ─────────────────────────────── */}
      <NorthArrow cx={885} cy={26} />

      {/* ── SCALE BAR ────────────────────────────────── */}
      <ScaleBar x={50} y={567} />

      {/* ── LEGEND ──────────────────────────────────── */}
      <g transform="translate(290,564)">
        <line x1="0" y1="0" x2="0" y2="-18" stroke={W} strokeWidth="1.5" />
        <path d="M18,0 A18,18 0 0,0 0,-18" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="3,2" />
        <text x="24" y="-2" fontFamily={FT} fontSize="7" fill="#888">Door swing</text>
        <line x1="100" y1="-4" x2="148" y2="-4" stroke={W} strokeWidth="5" />
        <text x="154" y="-2" fontFamily={FT} fontSize="7" fill="#888">Wall</text>
        <line x1="232" y1="-4" x2="280" y2="-4" stroke="#3366aa" strokeWidth="3" strokeDasharray="8,4" />
        <text x="286" y="-2" fontFamily={FT} fontSize="7" fill="#888">Glass wall</text>
        <line x1="380" y1="-4" x2="428" y2="-4" stroke="#888" strokeWidth="6" />
        <text x="434" y="-2" fontFamily={FT} fontSize="7" fill="#888">Roller door</text>
      </g>

      {/* ── TITLE BLOCK ──────────────────────────────── */}
      <text x="460" y="612" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#ccc" letterSpacing="2">
        AUTOMOTIVE VAULT — FLOOR PLAN — ILLUSTRATIVE, NOT TO SCALE
      </text>
    </svg>
  )
}
