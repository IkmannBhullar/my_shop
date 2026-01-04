import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card, Container } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const CartScreen = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart from storage when page loads
    const items = localStorage.getItem('cartItems') 
      ? JSON.parse(localStorage.getItem('cartItems')) 
      : [];
    setCartItems(items);
  }, []);

  const removeFromCartHandler = (id) => {
    // Filter out the item to delete
    const newItems = cartItems.filter((x) => x.product !== id);
    setCartItems(newItems);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
  };

  const checkoutHandler = () => {
    // If logged in, go to shipping; if not, go to login
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        navigate('/shipping'); // We will build this next
    } else {
        navigate('/login?redirect=shipping');
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <div className='alert alert-info'>
              Your cart is empty <Link to='/'>Go Back</Link>
            </div>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      {/* Quantity Display (Static for now) */}
                      Qty: {item.qty}
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                {/* Calculate Total Items and Price */}
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block w-100'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;