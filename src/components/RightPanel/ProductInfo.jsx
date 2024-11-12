// ProductInfo.jsx
import React from 'react';
import styles from './ProductInfo.module.css';

const ProductInfo = ({ name, price, description }) => {
  // Asegurarse de que el precio sea válido, sino mostrar un mensaje o $0
  const displayPrice = typeof price === 'number' && price > 0 ? price.toFixed(2) : "N/A";

  return (
    <div className={styles.productInfo}>
      <h1 className={styles.productName}>{name}</h1>
      <p className={styles.productPrice}>${displayPrice}</p>
      <p className={styles.productDescription}>{description}</p>
    </div>
  );
};

export default ProductInfo;
