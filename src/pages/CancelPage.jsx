import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CancelPage.module.css';

const CancelPage = () => {
  return (
    <div className={styles.cancelContainer}>
      <h1>Order Canceled</h1>
      <p>It seems your payment didn’t go through.</p>
      <p>If you’d like to try again, please return to the checkout page.</p>
      <Link to="/" className={styles.returnButton}>
      Return to Home
      </Link>
    </div>
  );
};

export default CancelPage;

