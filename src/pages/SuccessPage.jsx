import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SuccessPage.module.css';

const SuccessPage = () => {
  return (
    <div className={styles.successContainer}>
      <h1>Thank You for Your Order!</h1>
      <p>Your payment was successful. We are processing your order.</p>
      <p>Your payment was successful. We are processing your order.</p>
      <Link to="/" className={styles.returnButton}>
        Return to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
