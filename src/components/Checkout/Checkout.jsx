import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import styles from './Checkout.module.css';

// Cambia manualmente entre TEST y LIVE aquí
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); 

const validCities = [
  "new york", "manhattan", "harlem", "inwood", "washington heights", 
  "upper east side", "upper west side", "midtown", "chelsea", "tribeca",
  "soho", "east village", "west village", "financial district",
  "brooklyn", "williamsburg", "dumbo", "greenpoint", "bedford-stuyvesant", 
  "bushwick", "park slope", "prospect heights", "cobble hill", 
  "red hook", "flatbush", "sunset park", "bay ridge",
  "queens", "astoria", "long island city", "sunnyside", "woodside", 
  "jackson heights", "elmhurst", "flushing", "jamaica", "forest hills",
  "corona", "rego park", "bayside", "college point",
  "bronx", "south bronx", "riverdale", "throgs neck", 
  "mott haven", "fordham", "kingsbridge", "pelham bay",
  "woodlawn", "hunt point", "morissania",
  "staten island", "st. george", "todt hill", "great kills", 
  "new dorp", "tottenville", "port richmond", "mariners harbor", 
  "west brighton", "stapleton", "midland beach"
];

const Checkout = ({ onCancel }) => {
  const { cartItems, getTotalPrice } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Campo de correo agregado
    address: '',
    city: '',
    state: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async () => {
    try {
      const stripe = await stripePromise;
  
      const response = await fetch("https://leonardo-murillo-backend.vercel.app/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cartItems.map((item) => ({
            name: item.name,
            material: item.material,
            color: item.color,
            switchType: item.switchType,
            price: item.price,
            quantity: item.quantity,
          })),
          formData, // Enviar los datos del formulario al backend
        }),
      });
  
      const { id, error: sessionError } = await response.json();
      if (sessionError) {
        setError(sessionError);
        return;
      }
  
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setError("Could not create a checkout session. Please try again.");
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2>Checkout</h2>
      <div className={styles.orderSummary}>
        {cartItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className={styles.orderItem}>
            <span>{item.name} ({item.material || 'N/A'}, {item.color || 'N/A'}, {item.switchType || 'N/A'})</span>
            <span>{item.quantity} x ${(item.price ?? 0).toFixed(2)}</span>
          </div>
        ))}
        <div className={styles.totalPrice}>Total: ${(getTotalPrice() ?? 0).toFixed(2)}</div>
      </div>
      <form className={styles.checkoutForm}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State (NY only)"
          value={formData.state}
          onChange={handleChange}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="button" className={styles.placeOrderButton} onClick={handlePlaceOrder}>
          Place Order
        </button>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Checkout;
