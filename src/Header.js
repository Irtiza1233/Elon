    // Header.js

    import React from 'react';
    import { Navbar, Container, Nav } from 'react-bootstrap';
    import { formatMoney } from './utils';
    import './Header.css'; // Import your custom CSS

    const Header = ({ netWorth }) => (
  <Navbar bg="dark" variant="dark" fixed="top" className="custom-navbar">
  
        <Container>
    
        <Nav className="mx-auto">
            <Nav.Link disabled className="text-center">{formatMoney(netWorth)}</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    );

    export default Header;
