import { Alert } from 'react-bootstrap'

export default function ErrorState({ message = 'Something went wrong.' }) {
  return (
    <Alert variant="danger" className="my-4">
      {message}
    </Alert>
  )
}
