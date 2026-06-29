import { Card } from 'react-bootstrap'

function formatTime(t) {
  // backend sends LocalTime as "10:00:00" or "10:00"
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = parseInt(h, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  return `${displayHour}:${m} ${ampm}`
}

export default function TheatreShowList({ theatresMap, onSelectShow }) {
  const theatreNames = Object.keys(theatresMap || {})

  if (theatreNames.length === 0) {
    return (
      <div className="text-center py-5 text-muted-soft">
        No shows scheduled for this date.
      </div>
    )
  }

  return (
    <>
      {theatreNames.map((name) => (
        <Card key={name} className="theatre-card">
          <Card.Body>
            <div className="theatre-name mb-2">{name}</div>
            <div className="d-flex flex-wrap">
              {theatresMap[name].map((show) => (
                <button
                  key={show.showId}
                  type="button"
                  className="showtime-pill"
                  onClick={() => onSelectShow(show.showId)}
                  title={`${show.format} · ${show.language}`}
                >
                  {formatTime(show.startTime)}
                  <span className="format-tag ms-1">{show.format}</span>
                </button>
              ))}
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}
