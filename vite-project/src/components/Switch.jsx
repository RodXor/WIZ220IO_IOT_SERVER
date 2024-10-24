import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import axios from 'axios';

const DigitalSwitch = ({ isOn, index, onToggle }) => {
  const outputNumber = index + 4; // Esto mapeará 0-3 a 4-7

  const handleToggle = async () => {
    try {
      await axios.post('http://localhost:3001/set_digital_output', {
        outputNumber: outputNumber,
        value: !isOn // Invertimos el estado actual
      });
      onToggle(index); // Llamamos a la función onToggle del componente padre
    } catch (error) {
      console.error('Error al controlar la salida digital:', error);
    }
  };

  return (
    <div className="switch-container">
      <span>Salida Digital {outputNumber}</span>
      <Switch 
        checked={isOn} 
        onChange={handleToggle} 
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </div>
  );
};

DigitalSwitch.propTypes = {
  isOn: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default DigitalSwitch;
