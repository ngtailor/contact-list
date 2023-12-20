import React from 'react'
import { Navbar ,Container,Nav} from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home">User Registration</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/festure">Features</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default Header
