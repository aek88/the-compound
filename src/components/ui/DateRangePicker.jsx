import { useState, useMemo } from 'react'

// ── Date utilities (no external deps) ─────────────────────────────────────────

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function isSameDay(a, b) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate()
  )
}

function isBeforeDay(a, b) {
  return startOfDay(a) < startOfDay(b)
}

function isAfterDay(a, b) {
  return startOfDay(a) > startOfDay(b)
}

// Returns a grid of Date objects for the given month.
// Week starts Monday. Always returns complete rows (multiple of 7).
function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Monday-first dow: (getDay() + 6) % 7  →  Mon=0 … Sun=6
  const leadingBlanks = (firstDay.getDay() + 6) % 7

  const cells = []

  for (let i = leadingBlanks; i > 0; i--) {
    cells.push({ date: new Date(year, month, 1 - i), currentMonth: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), currentMonth: true })
  }
  const trailing = (7 - (cells.length % 7)) % 7
  for (let i = 1; i <= trailing; i++) {
    cells.push({ date: new Date(year, month + 1, i), currentMonth: false })
  }
  // Minimum 5 rows
  while (cells.length < 35) {
    const last = cells[cells.length - 1]
    cells.push({ date: new Date(last.date.getTime() + 86400000), currentMonth: false })
  }

  return cells
}

function formatShort(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatRange(start, end) {
  if (!start) return ''
  if (!end || isSameDay(start, end)) return formatShort(start)
  // Same year — omit year on the start date if same year
  const sameYear = start.getFullYear() === end.getFullYear()
  const startStr = start.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    ...(sameYear ? {} : { year: 'numeric' }),
  })
  return `${startStr} – ${formatShort(end)}`
}

// ── Constants ──────────────────────────────────────────────────────────────────

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAYS = ['Mo','Tu','We','Th','Fr','Sa','Su']

const AMBER     = '#C9913A'
const AMBER_DIM = 'rgba(201,145,58,0.12)'

// ── DayCell ────────────────────────────────────────────────────────────────────

function DayCell({ date, currentMonth, isToday, isUnavailable, isPast, isStart, isEnd, isInRange, onClick, onMouseEnter, onMouseLeave }) {
  const disabled  = isPast || isUnavailable
  const isSelected = isStart || isEnd

  let bg      = 'transparent'
  let color   = currentMonth ? '#0D0D0B' : '#B8B4AE'
  let cursor  = 'pointer'
  let opacity = 1

  if (isSelected) {
    bg    = AMBER
    color = '#fff'
  } else if (isInRange) {
    bg    = AMBER_DIM
    color = '#0D0D0B'
  } else if (isUnavailable) {
    bg     = '#F0EDE8'   // compound-surface
    color  = '#B8B4AE'  // compound-concrete
    cursor = 'not-allowed'
  } else if (isPast) {
    color  = '#D8D4CE'  // compound-border
    cursor = 'default'
  } else if (!currentMonth) {
    opacity = 0.35
  }

  return (
    <div
      role={disabled ? undefined : 'button'}
      tabIndex={disabled ? undefined : 0}
      aria-label={date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={disabled ? undefined : onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={e => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) onClick() }}
      className="relative flex items-center justify-center h-10 text-[13px] font-display select-none transition-colors duration-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-compound-amber"
      style={{ background: bg, color, cursor, opacity }}
    >
      {/* Diagonal strikethrough for unavailable dates */}
      {isUnavailable && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#B8B4AE" strokeWidth="1" />
        </svg>
      )}

      <span className="relative z-10 leading-none">{date.getDate()}</span>

      {/* Today indicator dot */}
      {isToday && !isSelected && (
        <span
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: AMBER }}
        />
      )}
    </div>
  )
}

// ── DateRangePicker ────────────────────────────────────────────────────────────
// Props:
//   unavailableDates  — Date[]  — dates that cannot be selected
//   onChange          — (string) => void  — called with formatted range string

export default function DateRangePicker({ unavailableDates = [], onChange }) {
  const today = useMemo(() => startOfDay(new Date()), [])

  const [viewYear,  setViewYear]  = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [start,     setStart]     = useState(null)
  const [end,       setEnd]       = useState(null)
  const [hover,     setHover]     = useState(null)

  // Quick lookup set for unavailable dates
  const unavailableSet = useMemo(
    () => new Set(unavailableDates.map(d => startOfDay(d).toDateString())),
    [unavailableDates]
  )

  function isUnavailable(date) { return unavailableSet.has(startOfDay(date).toDateString()) }
  function isPast(date)        { return isBeforeDay(date, today) }
  function isDisabled(date)    { return isPast(date) || isUnavailable(date) }

  function isInRange(date) {
    const lo = start
    const hi = end || hover
    if (!lo || !hi) return false
    const [a, b] = isBeforeDay(lo, hi) ? [lo, hi] : [hi, lo]
    return isAfterDay(date, a) && isBeforeDay(date, b)
  }

  function handleDayClick(date) {
    if (isDisabled(date)) return

    if (!start || (start && end)) {
      // Start a fresh selection
      setStart(date); setEnd(null)
      onChange(formatRange(date, null))
    } else if (isSameDay(date, start)) {
      // Deselect
      setStart(null); setEnd(null)
      onChange('')
    } else if (isBeforeDay(date, start)) {
      // Clicked before current start — make it the new start
      setStart(date); setEnd(null)
      onChange(formatRange(date, null))
    } else {
      // Set end date
      setEnd(date)
      onChange(formatRange(start, date))
    }
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  // Disable prev if already showing current month
  const canGoPrev = viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth())

  // Cap forward at 18 months
  const limitDate = new Date(today.getFullYear(), today.getMonth() + 18, 1)
  const canGoNext = new Date(viewYear, viewMonth + 1, 1) < limitDate

  const days = getCalendarDays(viewYear, viewMonth)

  const selectionLabel = start
    ? end
      ? formatRange(start, end)
      : `${formatShort(start)} — select an end date`
    : null

  return (
    <div className="border border-compound-border bg-compound-white overflow-hidden">

      {/* ── Month navigation ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-compound-border bg-compound-surface">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="w-8 h-8 flex items-center justify-center text-compound-steel hover:text-compound-black disabled:opacity-25 disabled:cursor-default transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <span className="font-display font-700 text-[13px] tracking-wider text-compound-black uppercase">
          {MONTHS[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          onClick={nextMonth}
          disabled={!canGoNext}
          aria-label="Next month"
          className="w-8 h-8 flex items-center justify-center text-compound-steel hover:text-compound-black disabled:opacity-25 disabled:cursor-default transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── Weekday labels ── */}
      <div className="grid grid-cols-7 px-2 pt-3 pb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-display font-700 tracking-widest text-compound-steel uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* ── Day grid ── */}
      <div className="grid grid-cols-7 px-2 pb-2">
        {days.map((cell, i) => (
          <DayCell
            key={i}
            date={cell.date}
            currentMonth={cell.currentMonth}
            isToday={isSameDay(cell.date, today)}
            isUnavailable={isUnavailable(cell.date)}
            isPast={isPast(cell.date)}
            isStart={isSameDay(cell.date, start)}
            isEnd={isSameDay(cell.date, end)}
            isInRange={isInRange(cell.date)}
            onClick={() => handleDayClick(cell.date)}
            onMouseEnter={() => start && !end && !isDisabled(cell.date) && setHover(cell.date)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </div>

      {/* ── Selection summary ── */}
      <div className="px-4 py-3 border-t border-compound-border bg-compound-surface min-h-[42px] flex items-center">
        {selectionLabel ? (
          <div className="flex items-center justify-between w-full gap-3">
            <p className="text-[12px] font-display font-600 text-compound-black">{selectionLabel}</p>
            <button
              type="button"
              onClick={() => { setStart(null); setEnd(null); setHover(null); onChange('') }}
              className="text-[11px] text-compound-steel hover:text-compound-black transition-colors flex-shrink-0"
            >
              Clear
            </button>
          </div>
        ) : (
          <p className="text-[11px] text-compound-steel">Click a date to set your preferred start date.</p>
        )}
      </div>

      {/* ── Legend ── */}
      <div className="px-4 py-2.5 border-t border-compound-border flex flex-wrap gap-x-5 gap-y-1.5">
        {[
          {
            swatch: <span className="w-3.5 h-3.5 flex-shrink-0" style={{ background: AMBER }} />,
            label: 'Selected',
          },
          {
            swatch: <span className="w-3.5 h-3.5 flex-shrink-0" style={{ background: AMBER_DIM }} />,
            label: 'Range',
          },
          {
            swatch: (
              <span className="w-3.5 h-3.5 flex-shrink-0 relative overflow-hidden" style={{ background: '#F0EDE8' }}>
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
                  <line x1="15%" y1="15%" x2="85%" y2="85%" stroke="#B8B4AE" strokeWidth="1.2" />
                </svg>
              </span>
            ),
            label: 'Unavailable',
          },
          {
            swatch: <span className="w-3.5 h-3.5 flex-shrink-0 relative" style={{ background: '#fff', border: '1px solid #D8D4CE' }}>
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: AMBER }} />
            </span>,
            label: 'Today',
          },
        ].map(({ swatch, label }) => (
          <span key={label} className="flex items-center gap-1.5 text-[10px] text-compound-steel">
            {swatch}
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
