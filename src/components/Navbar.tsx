import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
    <Container>
      <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
        Recipe App
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className="text-light  me-3">
            All Recipes
          </Nav.Link>
          <Nav.Link as={Link} to="/selected" className="text-light  me-3">
            Selected Recipes
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </Container>
  </BootstrapNavbar>
);

export default Navbar;