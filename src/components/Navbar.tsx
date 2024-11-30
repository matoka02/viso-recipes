import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <BootstrapNavbar bg='dark' variant='dark' expand='lg'>
    <Container>
      <BootstrapNavbar.Brand as={Link} to='/'>
        Recipe App
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls='basic-navbar-nav' />
      <BootstrapNavbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link as={Link} to='/'>
            All Recipes
          </Nav.Link>
          <Nav.Link as={Link} to='/selected'>
            Selected Recipes
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </Container>
  </BootstrapNavbar>
);

export default Navbar;