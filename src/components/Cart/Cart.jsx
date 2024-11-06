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
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemDetails}>
                ({item.material}, {item.color}, {item.switchType})
              </span>
            </div>
            <div className={styles.itemActions}>
              <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
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
