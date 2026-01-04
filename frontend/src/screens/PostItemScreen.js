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
  // --- CHANGE 1: Add State for Stock ---
  const [countInStock, setCountInStock] = useState(0); 
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
        alert('You must be logged in!');
        return;
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(
            '/api/products',
            // --- CHANGE 2: Send countInStock to backend ---
            { name, price, image, brand, category, description, countInStock },
            config
        );

        alert('Item Posted!');
        navigate('/');
    } catch (error) {
        alert('Error posting item');
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
            <Form.Label>Image</Form.Label>
            <Form.Control type='text' placeholder='Image path' value={image} onChange={(e) => setImage(e.target.value)} disabled />
            <Form.Control 
              type='file' 
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFileHandler}
            ></Form.Control>
            {uploading && <div>Uploading...</div>}
        </Form.Group>

        <Form.Group className='my-3'>
            <Form.Label>Brand</Form.Label>
            <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
        </Form.Group>

        {/* --- CHANGE 3: Add Count In Stock Input --- */}
        <Form.Group className='my-3'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control type='number' placeholder='Enter stock quantity' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
        </Form.Group>
        {/* ------------------------------------------ */}

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