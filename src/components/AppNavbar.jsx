import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function AppNavbar() {
  return (
    <Navbar expand="md" className="app-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          CINE<span className="accent">PLEX</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
