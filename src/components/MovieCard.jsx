import { Card, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function MovieCard({ movie }) {
  const navigate = useNavigate()
  const genres = Array.isArray(movie.genre) ? movie.genre : []

  return (
    <Card className="movie-card h-100" onClick={() => navigate(`/movies/${movie.movieId}`)}>
      <div className="poster-wrap">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={movie.movieName} />
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100 text-muted-soft">
            No poster
          </div>
        )}
      </div>
      <Card.Body>
        <div className="movie-title">{movie.movieName}</div>
        <div className="text-muted-soft mb-2" style={{ fontSize: '.78rem' }}>
          {movie.language} · {movie.duration} min{movie.rating ? ` · ★ ${movie.rating}` : ''}
        </div>
        <div>
          {genres.slice(0, 2).map((g) => (
            <Badge key={g} className="badge-genre me-1">
              {g}
            </Badge>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}
