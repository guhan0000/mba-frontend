import { useMemo } from 'react'

const DOW = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

function pad(n) {
  return n.toString().padStart(2, '0')
}

function toIsoDate(d) {
  // Local Y-M-D, not UTC, so the date shown always matches the chip clicked
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function buildNext8Days() {
  const days = []
  const today = new Date()
  for (let i = 0; i < 8; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }
  return days
}

export default function DateStrip({ selectedDate, onSelect, availableDates }) {
  const dates = useMemo(buildNext8Days, [])

  return (
    <div className="date-strip">
      {dates.map((d) => {
        const iso = toIsoDate(d)
        const hasShows = availableDates?.has(iso)
        const active = iso === selectedDate

        return (
          <div
            key={iso}
            className={`date-chip ${active ? 'active' : ''} ${hasShows ? 'has-shows' : ''}`}
            onClick={() => onSelect(iso)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(iso)}
          >
            <div className="dow">{DOW[d.getDay()]}</div>
            <div className="dom">{d.getDate()}</div>
            <div className="mon">{MON[d.getMonth()]}</div>
            <div className="dot" />
          </div>
        )
      })}
    </div>
  )
}
