import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Gets 2026 automatically

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>
              <strong>SwapSpot</strong> &copy; {currentYear}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#777' }}>
              Built by Ikmann | Powered by MERN Stack
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;