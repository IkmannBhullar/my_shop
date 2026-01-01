import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUser, FaPlus } from 'react-icons/fa'; // Icons for "User" and "Add"
import { LinkContainer } from 'react-router-bootstrap'; // Use this to stop page refresh

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              
              {/* Link to Post Item (Craigslist Style) */}
              <LinkContainer to="/post-item">
                <Nav.Link>
                    <FaPlus /> Post Item
                </Nav.Link>
              </LinkContainer>

              {/* Link to Login */}
              <LinkContainer to="/login">
                <Nav.Link>
                    <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;