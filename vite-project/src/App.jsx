import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [outputStates, setOutputStates] = useState(Array(8).fill(false));

  const handleCheckboxChange = (index) => {
    const updatedOutputs = [...outputStates];
    updatedOutputs[index] = !updatedOutputs[index];
    setOutputStates(updatedOutputs);
  };

  const handleSubmit = async () => {
    const commandParams = outputStates
      .map((state, idx) => `DO_${idx}=${state ? 'on' : 'off'}`)
      .join('&');
    const url = `/api//DOCTL.CGI?${commandParams}`;
    console.log('Comando enviado:', url);

    try {
      const response = await axios.get(url);
      console.log('Respuesta del dispositivo:', response.data);
    } catch (error) {
      console.error('Error al enviar el comando:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Control de Salidas Digitales</h1>
      <ul>
        {outputStates.map((state, index) => (
          <li key={index}>
            <label>
              Salida {index}:
              <input
                type="checkbox"
                checked={state}
                onChange={() => handleCheckboxChange(index)}
              />
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Enviar Cambios</button>
    </div>
  );
};

export default App;
