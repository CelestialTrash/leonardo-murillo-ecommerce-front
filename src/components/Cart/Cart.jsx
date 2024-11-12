// Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './Cart.module.css';

const Cart = ({ onCheckout }) => {
  const { cartItems, increaseQuantity, decreaseQuantity, getTotalPrice, removeItem } = useContext(CartContext);

  return (
    <div className={styles.cartContainer}>
      <h2>Your Cart</h2>
      <div className={styles.cartItems}>
        {cartItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{item.name || 'Unnamed Item'}</span>
              <span className={styles.itemDetails}>
                ({typeof item.material === 'string' ? item.material : 'N/A'}, 
                {typeof item.color === 'string' ? item.color : 'N/A'}, 
                {typeof item.switchType === 'string' ? item.switchType : 'N/A'})
              </span>
            </div>
            <div className={styles.itemActions}>
              <span className={styles.itemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <div className={styles.quantityControl}>
                <button onClick={() => decreaseQuantity(item)} className={styles.decreaseButton}>
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item)} className={styles.increaseButton}>
                  +
                </button>
              </div>
              <button onClick={() => removeItem(item)} className={styles.removeButton}>
                Remove item
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.totalContainer}>
        <span>Total</span>
        <span className={styles.totalPrice}>${getTotalPrice().toFixed(2)}</span>
      </div>
      <button onClick={onCheckout} className={styles.checkoutButton}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
