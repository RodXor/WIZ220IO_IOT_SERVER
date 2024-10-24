import React from 'react';
import PropTypes from 'prop-types';

const LedIndicator = ({ isOn, index }) => {
  return (
    <div className="led-container">
      <span>Entrada Digital {index + 1}</span>
      <div className={`led ${isOn ? 'on' : 'off'}`} />
    </div>
  );
};

LedIndicator.propTypes = {
  isOn: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default LedIndicator;
