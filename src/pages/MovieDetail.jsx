import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import DateStrip from '../components/DateStrip.jsx'
import TheatreShowList from '../components/TheatreShowList.jsx'
import LoadingState from '../components/LoadingState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { getAllMovies } from '../api/movies.js'
import { getCalendar, getTheatresWithShows } from '../api/shows.js'

function pad(n) {
  return n.toString().padStart(2, '0')
}
function toIsoToday() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export default function MovieDetail() {
  const { movieId } = useParams()
  const navigate = useNavigate()

  // Movie info
  const [movie, setMovie] = useState(null)
  const [movieStatus, setMovieStatus] = useState('loading')

  // Booking section — hidden until "Book" is clicked (requirement 3)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(toIsoToday())
  const [availableDates, setAvailableDates] = useState(new Set())
  const [theatresMap, setTheatresMap] = useState({})
  const [showsStatus, setShowsStatus] = useState('idle')

  // NOTE: there's no GET /movies/{id} endpoint yet, so we reuse the list
  // endpoint and find this movie client-side. Add a dedicated endpoint
  // later if the movie list grows large.
  useEffect(() => {
    getAllMovies()
      .then((movies) => {
        const found = movies.find((m) => String(m.movieId) === movieId)
        setMovie(found || null)
        setMovieStatus(found ? 'ready' : 'error')
      })
      .catch(() => setMovieStatus('error'))
  }, [movieId])

  // Only fetch calendar dots once booking is opened
  useEffect(() => {
    if (!bookingOpen) return
    getCalendar(movieId)
      .then((calendar) => setAvailableDates(new Set(Object.keys(calendar || {}))))
      .catch(() => setAvailableDates(new Set()))
  }, [movieId, bookingOpen])

  // Refetch theatres/showtimes whenever the selected date changes
  useEffect(() => {
    if (!bookingOpen) return
    setShowsStatus('loading')
    getTheatresWithShows(movieId, selectedDate)
      .then((data) => {
        setTheatresMap(data || {})
        setShowsStatus('ready')
      })
      .catch(() => setShowsStatus('error'))
  }, [movieId, selectedDate, bookingOpen])

  const genres = useMemo(
    () => (Array.isArray(movie?.genre) ? movie.genre.join(', ') : ''),
    [movie]
  )

  if (movieStatus === 'loading') {
    return (
      <Container>
        <LoadingState label="Loading movie…" />
      </Container>
    )
  }
  if (movieStatus === 'error') {
    return (
      <Container>
        <ErrorState message="Movie not found." />
      </Container>
    )
  }

  return (
    <Container>
      <div className="d-flex flex-wrap gap-4 mb-4">
        {movie.posterUrl && (
          <img src={movie.posterUrl} alt={movie.movieName} className="movie-poster-lg" />
        )}
        <div className="flex-grow-1" style={{ minWidth: 240 }}>
          <h1 className="font-display mb-2" style={{ fontSize: '1.7rem' }}>
            {movie.movieName}
          </h1>
          <div className="text-muted-soft">
            {movie.language} · {movie.duration} min
            {movie.rating ? ` · ★ ${movie.rating}` : ''}
          </div>
          {genres && <div className="mt-1 text-muted-soft" style={{ fontSize: '.85rem' }}>{genres}</div>}
          {movie.description && <p className="mt-3" style={{ maxWidth: 560 }}>{movie.description}</p>}

          {!bookingOpen && (
            <Button className="btn-gold mt-2" size="lg" onClick={() => setBookingOpen(true)}>
              Book
            </Button>
          )}
        </div>
      </div>

      {bookingOpen && (
        <div className="reveal-section">
          <hr style={{ borderColor: 'var(--bs-border-color)' }} className="mb-4" />

          <h2 className="font-display mb-2" style={{ fontSize: '1rem' }}>
            Select Date
          </h2>
          <DateStrip
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
            availableDates={availableDates}
          />

          <h2 className="font-display mt-3 mb-3" style={{ fontSize: '1rem' }}>
            Theatres &amp; Showtimes
          </h2>
          {showsStatus === 'loading' && <LoadingState label="Loading showtimes…" />}
          {showsStatus === 'error' && <ErrorState message="Couldn't load showtimes." />}
          {showsStatus === 'ready' && (
            <TheatreShowList
              theatresMap={theatresMap}
              onSelectShow={(showId) => navigate(`/shows/${showId}/seats`)}
            />
          )}
        </div>
      )}
    </Container>
  )
}
