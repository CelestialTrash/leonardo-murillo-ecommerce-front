// App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProductPage from './pages/ProductPage';
import './styles/index.css';

// Carga de la clave pública de Stripe
const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY'); // Reemplaza 'YOUR_PUBLISHABLE_KEY' con tu clave pública de Stripe

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Routes>
          <Route path="/" element={<ProductPage />} />
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;
