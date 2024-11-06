// CartButton.jsx
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './CartButton.module.css';
import cartIcon from '../../assets/cart-basket-ecommerce-svgrepo-com.svg';
import closeIcon from '../../assets/close-svgrepo-com.svg'

const CartButton = ({ onClick, isCartOpen }) => {
  const { cartItemCount } = useContext(CartContext);

  return (
    <button className={styles.cartButton} onClick={onClick}>
      {isCartOpen ? (
        <img src={closeIcon} alt="Close Cart" className={styles.cartIcon} /> // Icono de cerrar
      ) : (
        <img src={cartIcon} alt="Cart" className={styles.cartIcon} /> // Icono del carrito
      )}
      {!isCartOpen && cartItemCount > 0 && (
        <span className={styles.itemCount}>{cartItemCount}</span>
      )}
    </button>
  );
};

export default CartButton;

