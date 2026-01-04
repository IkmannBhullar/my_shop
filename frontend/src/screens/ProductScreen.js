import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1); // <--- State for Quantity
  const { id } = useParams();
  const navigate = useNavigate();

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  // --- NEW: Add to Cart Logic ---
  const addToCartHandler = () => {
    // 1. Get existing cart from storage
    let cartItems = localStorage.getItem('cartItems') 
      ? JSON.parse(localStorage.getItem('cartItems')) 
      : [];

    // 2. Create the item object
    const item = {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: Number(qty)
    };

    // 3. Check if item already exists
    const existItem = cartItems.find((x) => x.product === item.product);

    if (existItem) {
      // If it exists, update the quantity
      cartItems = cartItems.map((x) => 
        x.product === existItem.product ? item : x
      );
    } else {
      // If not, push new item
      cartItems.push(item);
    }

    // 4. Save back to storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // 5. Go to Cart Page
    navigate('/cart');
  };

  const deleteHandler = async () => {
     // ... (Keep your existing delete logic here if you want)
     // For brevity, I'm skipping repeating the delete logic, 
     // but you can paste your delete function from Phase 17 here.
  };

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      <Row>
        <Col md={6}><Image src={product.image} alt={product.name} fluid /></Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroup.Item>

              {/* --- NEW: QUANTITY SELECTOR --- */}
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {/* Create options [1, 2, 3...] based on stock */}
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler} // <--- Attach the Click Event
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductScreen;