// CordColorSelector.jsx
import React, { useState, useEffect } from 'react';
import styles from './CordColorSelector.module.css';

const CordColorSelector = ({ colors, onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.color || '');

  useEffect(() => {
    if (colors.length > 0) {
      setSelectedColor(colors[0].color);
      onColorSelect(colors[0].name); // Only pass the color name to parent
    }
  }, [colors, onColorSelect]);

  const handleColorChange = (color) => {
    setSelectedColor(color.color);
    onColorSelect(color.name); // Pass only the color name to parent
  };

  const selectedColorName = colors.find(color => color.color === selectedColor)?.name || '';

  return (
    <div className={styles.cordColorSelector}>
      <h3>Cord Color — {selectedColorName}</h3>
      <div className={styles.colorContainer}>
        {colors.map((color, index) => (
          <button
            key={index}
            className={`${styles.colorButton} ${selectedColor === color.color ? styles.active : ''}`}
            style={{ backgroundColor: color.color }}
            onClick={() => handleColorChange(color)}
            aria-label={`Select color ${color.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CordColorSelector;



