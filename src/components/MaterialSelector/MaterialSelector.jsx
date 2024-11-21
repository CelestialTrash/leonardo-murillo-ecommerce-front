// MaterialSelector.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importar Link de React Router
import styles from './MaterialSelector.module.css';

const MaterialSelector = ({ materials, onMaterialSelect }) => {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]?.material || '');

  useEffect(() => {
    if (materials.length > 0) {
      setSelectedMaterial(materials[0].material);
      onMaterialSelect(materials[0]); // Pass full object {material, price}
    }
  }, [materials, onMaterialSelect]);

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material.material);
    onMaterialSelect(material); // Pass the selected material object
  };

  return (
    <div className={styles.materialSelector}>
      <h3>Material — {selectedMaterial}</h3>
      <div className={styles.buttonContainer}>
        {materials.map((material) => (
          <button
            key={material.material}
            onClick={() => handleMaterialChange(material)}
            className={`${styles.materialButton} ${
              selectedMaterial === material.material ? styles.active : ''
            }`}
          >
            {material.material}
          </button>
        ))}
      </div>
      {/* Usamos Link para apuntar al ID del componente MaterialComparisonTable */}
      <Link to="#materials-comparison" className={styles.materialLink}>
        See materials comparison
      </Link>
    </div>
  );
};

export default MaterialSelector;

