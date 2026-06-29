import { Spinner } from 'react-bootstrap'

export default function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" style={{ color: 'var(--marquee-gold)' }} />
      <p className="mt-3 text-muted-soft">{label}</p>
    </div>
  )
}
