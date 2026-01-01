import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const submitHandler = async (e) => {
    e.preventDefault();
    try {
        // 1. Send email and password to backend
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        );

        // 2. If successful, log the data (User info + Token)
        console.log('SUCCESS:', data);
        
        // 3. Save the user info in the browser so they stay logged in
        localStorage.setItem('userInfo', JSON.stringify(data));
        
        // 4. Redirect them to the home page
        window.location.href = '/';

    } catch (error) {
        alert('Invalid Email or Password');
    }
  };

  return (
    <Row className='justify-content-md-center'>
      <Col xs={12} md={6}>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          
          <Form.Group className='my-3' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-3'>
            Sign In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer? <Link to='/register'>Register</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginScreen;