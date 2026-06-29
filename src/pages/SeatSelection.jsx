import { useParams } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function SeatSelection() {
  const { showId } = useParams()

  return (
    <Container>
      <div className="placeholder-panel">
        <div className="text-muted-soft mb-2" style={{ fontSize: '.75rem', letterSpacing: '.08em' }}>
          SHOW ID: {showId}
        </div>
        <h1 className="font-display mb-2" style={{ fontSize: '1.3rem' }}>
          Seat selection is next
        </h1>
        <p className="text-muted-soft mb-3">
          You'll pick your seats here, then move on to checkout. This page is the next build step.
        </p>
        <Button as={Link} to="/" className="btn-outline-gold">
          Back to movies
        </Button>
      </div>
    </Container>
  )
}
