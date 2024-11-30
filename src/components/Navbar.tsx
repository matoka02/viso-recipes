import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => (
  <BootstrapNavbar bg='dark' variant='dark' expand='lg' className='shadow-sm'>
    <Container>
      <BootstrapNavbar.Brand as={Link} to='/' className='fw-bold text-light'>
        Recipe App
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls='basic-navbar-nav' />
      <BootstrapNavbar.Collapse id='basic-navbar-nav'>
        <Nav className='ms-auto'>
          <Nav.Link as={Link} to='/' className='text-light fw-semibold me-3'>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to='/selected' className='text-light fw-semibold me-3'>
            Selected Recipes
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </Container>
  </BootstrapNavbar>
);