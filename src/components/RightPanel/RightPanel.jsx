// RightPanel.jsx
import React from 'react';
import styles from './RightPanel.module.css'; // Importa el archivo CSS para estilos

const RightPanel = ({ children }) => {
  return <div className={styles.rightPanel}>{children}</div>;
};

export default RightPanel;
