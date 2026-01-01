// A form to ask for item details.
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostItemScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // 1. Get the User Token from storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
        alert('You must be logged in!');
        return;
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // <--- Show the badge!
            },
        };

        await axios.post(
            '/api/products',
            { name, price, image, brand, category, description },
            config
        );

        alert('Item Posted!');
        navigate('/'); // Go back home
    } catch (error) {
        alert('Error posting item');
        console.error(error);
    }
  };

  return (
    <Container>
      <h1>Post a New Item</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3'>
            <Form.Label>Item Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className='my-3'>
            <Form.Label>Price</Form.Label>
            <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>

        <Form.Group className='my-3'>
            <Form.Label>Image URL (Copy from Google Images)</Form.Label>
            <Form.Control type='text' placeholder='http://example.com/image.jpg' value={image} onChange={(e) => setImage(e.target.value)} />
        </Form.Group>

        <Form.Group className='my-3'>
            <Form.Label>Brand</Form.Label>
            <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
        </Form.Group>

        <Form.Group className='my-3'>
            <Form.Label>Category</Form.Label>
            <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)} />
        </Form.Group>

        <Form.Group className='my-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control as='textarea' rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Button type='submit' variant='primary'>Post Item</Button>
      </Form>
    </Container>
  );
};

export default PostItemScreen;