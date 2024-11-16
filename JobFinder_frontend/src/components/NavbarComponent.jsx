import React from 'react';
import { Navbar, Nav, Container, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaAppStore, FaInfoCircle, FaSearch } from 'react-icons/fa';

const NavbarComponent = () => {

  return (
    <>
      {/* Top Navigation Bar with Hamburger Button */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Job Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Profile">
              <FaUser /> User Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/applications">
              <FaAppStore /> Applications
            </Nav.Link>
            <Nav.Link as={Link} to="/Jobs">
              <FaInfoCircle /> Jobs
            </Nav.Link>
            <Nav.Link as={Link} to="#memes">
              <FaInfoCircle /> Dank Memes
            </Nav.Link>
          </Nav>

            {/* Search Input in the Navbar */}
            <Form className="d-flex">
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <Button variant="outline-light">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      
    </>
  );
};

export default NavbarComponent;
