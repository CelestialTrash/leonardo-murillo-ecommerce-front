// MaterialComparisonTable.jsx
import React from 'react';
import styles from './MaterialComparisonTable.module.css';

const MaterialComparisonTable = ({ materialComparison }) => {
  if (!materialComparison || materialComparison.length === 0) {
    return <p>No material comparison data available.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.comparisonTable}>
        <thead>
          <tr>
            <th>Aluminum</th>
            <th>Stainless Steel</th>
          </tr>
        </thead>
        <tbody>
          {materialComparison.map((row, index) => (
            <tr key={index}>
              <td>{row.aluminum}</td>
              <td>{row.stainlessSteel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialComparisonTable;