import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  const navigate = useNavigate();

  // 1. Check if there is already an address saved in storage
  const shippingAddress = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [state, setState] = useState(shippingAddress.state || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    
    // 2. Save the address to storage
    localStorage.setItem('shippingAddress', JSON.stringify({ address, city, state, postalCode, country }));
    
    // 3. Move to the next step
    navigate('/payment');
  };

  return (
    <Container>
      {/* Show the Progress Bar (Step 1 and Step 2 are active) */}
      <CheckoutSteps step1 step2 />
      
      <div className="row justify-content-md-center">
        <div className="col-md-6">
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3' controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter address' value={address} required onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>

                <Form.Group className='my-3' controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter city' value={city} required onChange={(e) => setCity(e.target.value)} />
                </Form.Group>

                <Form.Group className='my-3' controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Control type='text' placeholder='Enter state' value={state} required onChange={(e) => setState(e.target.value)} />
                </Form.Group>

                <Form.Group className='my-3' controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' placeholder='Enter postal code' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)} />
                </Form.Group>

                <Form.Group className='my-3' controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Enter country' value={country} required onChange={(e) => setCountry(e.target.value)} />
                </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </div>
      </div>
    </Container>
  );
};

export default ShippingScreen;