import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';

const RetroSwitch = styled(Button)(({ active }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  border: '3px solid #999',
  background: active
    ? 'radial-gradient(circle, #ff4d4d, #b30000)'
    : 'radial-gradient(circle, #d9d9d9, #808080)',
  color: 'white',
  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px',
  fontFamily: 'Courier New, Courier, monospace',
  fontSize: '12px',
  '&:hover': {
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.7)',
  },
}));

const App = () => {
  const [outputStates, setOutputStates] = useState(Array(7).fill(false));

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const response = await axios.get('/api/getInitialState');
        console.log('Estado inicial recibido:', response.data.states);
        setOutputStates(response.data.states.slice(0, 7)); // Solo las salidas 1 a 7
      } catch (error) {
        console.error('Error al obtener el estado inicial:', error.message);
      }
    };

    fetchInitialState();
  }, []);

  const handleButtonClick = (index) => {
    const updatedOutputs = [...outputStates];
    updatedOutputs[index] = !updatedOutputs[index];
    setOutputStates(updatedOutputs);
  };

  const handleSubmit = async () => {
    const commandParams = outputStates
      .map((state, idx) => `DO_${idx + 1}=${state ? 'on' : 'off'}`) // Ajusta el índice para que comience en 1
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
    <Container maxWidth={false} style={{ padding: '20px', width: '100vw' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Control de Salidas Digitales
      </Typography>
      <Box display="flex" justifyContent="center" flexWrap="wrap" width="100%">
        {outputStates.map((state, index) => (
          <Box key={index} textAlign="center">
            <RetroSwitch
              active={state ? 'true' : undefined} // Cambia a cadena o undefined
              onClick={() => handleButtonClick(index)}
            >
              {state ? 'ON' : 'OFF'}
            </RetroSwitch>
            <Typography variant="caption" display="block">
              Salida {index + 1}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" mt={2} width="100%">
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Enviar Cambios
        </Button>
      </Box>
    </Container>
  );
};

export default App;