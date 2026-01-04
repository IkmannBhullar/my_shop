    // This page pulls the cart, address, payment method from local storage
    // does the math for tax and shipping, and then saves the order to the backend
    import React, { useEffect } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap';
    import CheckoutSteps from '../components/CheckoutSteps';
    import axios from 'axios';

    const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
    const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod')) || 'PayPal';
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // 1. Calculate Prices
    // Helper to ensure 2 decimal places
    const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
    cart.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    // Shipping is free if over $100, otherwise $10
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);

    // Tax is 15% (Standard example)
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

    const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
    ).toFixed(2);
const placeOrderHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // --- THE FIX IS HERE: We added "const { data } =" ---
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cart,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
        config
      );

      // Clear cart
      localStorage.removeItem('cartItems');
      navigate(`/order/${data._id}`); // Now "data" exists, so this works!
      
    } catch (error) {
      alert('Error placing order');
    }
  };

    useEffect(() => {
    if (!paymentMethod) {
        navigate('/payment');
    }
    }, [navigate, paymentMethod]);

    return (
    <Container>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                <strong>Address:</strong>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.state}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.length === 0 ? (
                <p>Your cart is empty</p>
                ) : (
                <ListGroup variant='flush'>
                    {cart.map((item, index) => (
                    <ListGroup.Item key={index}>
                        <Row>
                        <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                            <Link to={`/product/${item.product}`}>
                            {item.name}
                            </Link>
                        </Col>
                        <Col md={4}>
                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Col>
                        </Row>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                )}
            </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice}</Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice}</Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice}</Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                    <Col>Total</Col>
                    <Col>${totalPrice}</Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Button
                    type='button'
                    className='btn-block w-100'
                    disabled={cart.length === 0}
                    onClick={placeOrderHandler}
                >
                    Place Order
                </Button>
                </ListGroup.Item>
            </ListGroup>
            </Card>
        </Col>
        </Row>
    </Container>
    );
    };

export default PlaceOrderScreen;