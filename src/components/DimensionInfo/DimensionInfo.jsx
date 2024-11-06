import React, { useState } from 'react';
import styles from './DimensionInfo.module.css';

const DimensionInfo = ({ dimensions, careInstructions }) => {
  const [activeTab, setActiveTab] = useState('care'); // Default to "care" tab

  if (!dimensions) {
    return null; // If dimensions is null, don't render anything
  }

  return (
    <div className={styles.dimensionInfo}>
      <div className={styles.tabs}>
        <h4
          onClick={() => setActiveTab('care')}
          className={activeTab === 'care' ? styles.activeTab : ''}
        >
          Care Instructions
        </h4>
        <h4
          onClick={() => setActiveTab('dimensions')}
          className={activeTab === 'dimensions' ? styles.activeTab : ''}
        >
          Dimension
        </h4>
      </div>
      <div className={styles.content}>
        {/* Display care instructions only if "care" tab is active */}
        {activeTab === 'care' && (
          <div className={styles.tabContent}>
            <p>{careInstructions}</p>
          </div>
        )}
        {/* Display dimensions details only if "dimensions" tab is active */}
        {activeTab === 'dimensions' && (
          <div className={styles.tabContent}>
            <p><strong>Total:</strong> {dimensions.total || 'N/A'}</p>
            <p><strong>Shade:</strong> {dimensions.shade || 'N/A'}</p>
            <p><strong>Cord Length:</strong> {dimensions.cordLength || 'N/A'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DimensionInfo;
