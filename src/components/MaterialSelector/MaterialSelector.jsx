// MaterialSelector.jsx
import React, { useState, useEffect } from 'react';
import styles from './MaterialSelector.module.css';

const MaterialSelector = ({ materials, onMaterialSelect }) => {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);

  useEffect(() => {
    if (materials.length > 0) {
      setSelectedMaterial(materials[0]);
      onMaterialSelect(materials[0]); // Notify initial selection with just the material name
    }
  }, [materials, onMaterialSelect]);

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    onMaterialSelect(material); // Pass only the material name
  };

  return (
    <div className={styles.materialSelector}>
      <h3>Material — {selectedMaterial}</h3>
      <div className={styles.buttonContainer}>
        {materials.map((material) => (
          <button
            key={material}
            onClick={() => handleMaterialChange(material)}
            className={`${styles.materialButton} ${
              selectedMaterial === material ? styles.active : ''
            }`}
          >
            {material}
          </button>
        ))}
      </div>
      <a href="#" className={styles.materialLink}>See materials comparison</a>
    </div>
  );
};

export default MaterialSelector;

