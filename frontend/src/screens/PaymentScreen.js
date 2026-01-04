    import React, { useState } from 'react';
    import { Form, Button, Col, Container } from 'react-bootstrap';
    import { useNavigate } from 'react-router-dom';
    import CheckoutSteps from '../components/CheckoutSteps';

    const PaymentScreen = () => {
    const navigate = useNavigate();

    // If they somehow skipped shipping, send them back
    const shippingAddress = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

    if (!shippingAddress.address) {
    navigate('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal'); // Default to PayPal

    const submitHandler = (e) => {
    e.preventDefault();
    // Save payment method to storage
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
    // Move to final step
    navigate('/placeorder');
    };

    return (
    <Container>
        {/* Steps 1, 2, and 3 are active now */}
        <CheckoutSteps step1 step2 step3 />
        
        <div className="row justify-content-md-center">
        <div className="col-md-6">
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3'>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    
                    <Col>
                        {/* Radio Button for PayPal/Credit Card */}
                        <Form.Check 
                            type='radio' 
                            label='PayPal or Credit Card' 
                            id='PayPal' 
                            name='paymentMethod' 
                            value='PayPal' 
                            checked 
                            onChange={(e) => setPaymentMethod(e.target.value)} 
                        ></Form.Check>
                        
                        {/* You can add more options like 'Stripe' here later */}
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </div>
        </div>
    </Container>
    );
    };

    export default PaymentScreen;