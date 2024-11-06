// SwitchTypeSelector.jsx
import React, { useState, useEffect } from 'react';
import styles from './SwitchTypeSelector.module.css';

const SwitchTypeSelector = ({ switchTypes, onSwitchSelect }) => {
  const [selectedSwitch, setSelectedSwitch] = useState(switchTypes[0]);

  useEffect(() => {
    if (switchTypes.length > 0) {
      setSelectedSwitch(switchTypes[0]);
      onSwitchSelect(switchTypes[0]); // Pass only the switch type name
    }
  }, [switchTypes, onSwitchSelect]);

  const handleSwitchChange = (switchType) => {
    setSelectedSwitch(switchType);
    onSwitchSelect(switchType); // Pass only the switch type name
  };

  return (
    <div className={styles.switchTypeSelector}>
      <h3>Switch Type — {selectedSwitch}</h3>
      <div className={styles.buttonContainer}>
        {switchTypes.map((switchType) => (
          <button
            key={switchType}
            className={`${styles.switchButton} ${selectedSwitch === switchType ? styles.active : ''}`}
            onClick={() => handleSwitchChange(switchType)}
          >
            {switchType}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SwitchTypeSelector;
