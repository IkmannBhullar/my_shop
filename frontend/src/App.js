import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PostItemScreen from './screens/PostItemScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/post-item" element={<PostItemScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            {/* We will add the Login and Post Item routes here later */}
          </Routes>
        </Container>
      </main>
    </Router>
  );
};

export default App;