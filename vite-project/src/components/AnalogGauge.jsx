import React from 'react';
import PropTypes from 'prop-types';
import GaugeChart from 'react-gauge-chart';

const AnalogGauge = ({ value, index }) => {
  return (
    <div className="gauge-container">
      <GaugeChart 
        id={`gauge-${index}`}
        nrOfLevels={20}
        percent={value / 1023}
        textColor="#000000"
        formatTextValue={value => `${(value / 1023 * 100).toFixed(2)}%`}
      />
      <p>Entrada Analógica {index + 1}: {value}</p>
    </div>
  );
};

AnalogGauge.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default AnalogGauge;
