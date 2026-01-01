import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  // This runs as soon as the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      // We ask the backend (port 5001) for data
      const { data } = await axios.get('/api/products'); 
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <h1 className="my-3">Latest Listings</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              <Card.Img src={product.image} variant="top" />
              <Card.Body>
                <Card.Title as="div">
                  <strong>{product.name}</strong>
                </Card.Title>
                <Card.Text as="div">
                  <div className="my-3">
                    {product.description.substring(0, 50)}...
                  </div>
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;