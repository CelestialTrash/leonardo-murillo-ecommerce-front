import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import styles from './Checkout.module.css';

// Load Stripe public key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY_TEST);
console.log("Public Key loaded:", import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = ({ onCancel }) => {
  const { cartItems, getTotalPrice } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
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
    console.log("Cart Items being sent to backend:", cartItems); // Verifica que aquí llegan los datos correctos
    console.log("Form Data being sent:", formData);
  
    try {
      const stripe = await stripePromise;
  
      const response = await fetch("http://localhost:5000/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cartItems.map(item => ({
            name: item.name,
            material: item.material,
            color: item.color,
            switchType: item.switchType,
            price: Math.round(item.price * 100),
            quantity: item.quantity,
          })),
          formData,
          totalPrice: Math.round(getTotalPrice() * 100),
        }),
      });
  
      const { id } = await response.json();
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };
  

  return (
    <div className={styles.checkoutContainer}>
      <h2>Checkout</h2>
      <div className={styles.orderSummary}>
        {cartItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className={styles.orderItem}>
            <span>{item.name} ({item.material || 'N/A'}, {item.color || 'N/A'}, {item.switchType || 'N/A'})</span>
            <span>{item.quantity} x ${item.price.toFixed(2)}</span>
          </div>
        ))}
        <div className={styles.totalPrice}>Total: ${getTotalPrice().toFixed(2)}</div>
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
