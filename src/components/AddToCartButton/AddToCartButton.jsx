import React, { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { CartContext } from '../../context/CartContext';
import styles from './AddToCartButton.module.css';
import { FaCheck } from 'react-icons/fa';

const AddToCartButton = ({ product, selectedMaterial, selectedColor, selectedSwitch }) => {
  const { addItem } = useContext(CartContext);

  const handleAddToCart = () => {
    // Add item to cart without validation
    addItem({
      id: product.name, // Unique ID
      name: product.name,
      material: selectedMaterial?.material || 'Default Material', // Optional material
      price: selectedMaterial?.price || product.price || 0, // Default to product price if no material
      color: selectedColor || 'Default Color',
      switchType: selectedSwitch || 'Default Switch',
    });

    toast.success('Item added to cart!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: <FaCheck size={16} color="#333" />, // Ícono negro personalizado
      style: {
        backgroundColor: '#fff',
        color: '#333',
        border: '1px solid #333',
        borderRadius: '8px',
        fontSize: '14px',
      },
      progressStyle: {
        backgroundColor: '#333',
      },
    });
    
    
  };

  return (
    <div className={styles.container}>
      {/* Add to Cart Button */}
      <button onClick={handleAddToCart} className={styles.addToCartButton}>
        Add to Cart
      </button>

      {/* Toastify container to render notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddToCartButton;
