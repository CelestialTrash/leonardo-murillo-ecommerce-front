import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './AddToCartButton.module.css';

const AddToCartButton = ({ product, selectedMaterial, selectedColor, selectedSwitch }) => {
  const { addItem } = useContext(CartContext);

  const handleAddToCart = () => {
    if (selectedMaterial) {
      addItem({
        id: product.name, // Unique ID
        name: product.name,
        material: selectedMaterial.material, // Use material's key from Sanity
        price: selectedMaterial.price, // Use the price from selected material
        color: selectedColor,
        switchType: selectedSwitch,
      });
    } else {
      console.error('No material selected.');
    }
  };

  return (
    <button onClick={handleAddToCart} className={styles.addToCartButton}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
