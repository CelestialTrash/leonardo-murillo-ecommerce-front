// ProductInfo.jsx
import React from 'react';
import styles from './ProductInfo.module.css';

const ProductInfo = ({ name, price, description }) => {
  return (
    <div className={styles.productInfo}>
      <h1 className={styles.productName}>{name}</h1>
      <p className={styles.productPrice}>${price ? price.toFixed(2) : "0.00"}</p>
      <p className={styles.productDescription}>{description}</p>
    </div>
  );
};

export default ProductInfo;
