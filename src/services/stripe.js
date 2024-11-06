// services/stripe.js

import { loadStripe } from '@stripe/stripe-js';

// Cargar la clave pública de Stripe
export const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY);
