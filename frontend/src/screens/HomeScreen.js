import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'; // <--- Import useLocation

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  
  // 1. Get the keyword from the URL (e.g. ?keyword=iPhone)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      // 2. Pass the keyword to the backend
      const { data } = await axios.get(`/api/products?keyword=${keyword}`);
      setProducts(data);
    };

    fetchProducts();
  }, [keyword]); // <--- Rerun this every time the keyword changes

  return (
    <>
      <h1>Latest Listings</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
              </Link>
              <Card.Body>
                <Link to={`/product/${product._id}`}>
                  <Card.Title as="div">
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>
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
    </>
  );
};

export default HomeScreen;