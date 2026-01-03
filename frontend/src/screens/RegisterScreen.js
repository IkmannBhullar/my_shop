import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const config = { headers: { 'Content-Type': 'application/json' } };

        // Send data to backend
        const { data } = await axios.post(
            '/api/users',
            { name, email, password },
            config
        );

        // Login successful - save to storage
        localStorage.setItem('userInfo', JSON.stringify(data));
        window.location.href = '/'; // Go Home

    } catch (error) {
        alert('Error Registering (User might already exist)');
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>

                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            
            <Row className='py-3'>
                <Col>
                    Have an Account? <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;