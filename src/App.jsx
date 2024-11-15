// App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProductPage from './pages/ProductPage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import './styles/index.css';

// Carga de la clave pública de Stripe
const stripePromise = loadStripe('VITE_STRIPE_PUBLIC_KEY_TEST'); // Reemplaza 'YOUR_PUBLISHABLE_KEY' con tu clave pública de Stripe

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;
