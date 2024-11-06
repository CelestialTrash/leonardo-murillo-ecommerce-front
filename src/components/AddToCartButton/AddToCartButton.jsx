// AddToCartButton.jsx
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './AddToCartButton.module.css';

const AddToCartButton = ({ product, selectedMaterial, selectedColor, selectedSwitch }) => {
  const { addItem } = useContext(CartContext);

  const handleAddToCart = () => {
    addItem({
      ...product,
      material: selectedMaterial,
      color: selectedColor,
      switchType: selectedSwitch,
    });
  };

  return (
    <button onClick={handleAddToCart} className={styles.addToCartButton}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;

