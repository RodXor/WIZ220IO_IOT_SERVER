   // server.js
   import express from 'express';
   import cors from 'cors';
   import axios from 'axios';

   const app = express();
   const port = 3001;

   // Configura CORS para permitir solicitudes desde cualquier origen
   app.use(cors());

   // Si prefieres permitir solo desde un origen específico, usa:
   // app.use(cors({ origin: 'http://localhost:5173' }));

   app.use(express.json());

   const WIZ220IO_IP = '192.168.1.4';
   const WIZ220IO_PORT = 80;

   app.get('/api/DOCTL.CGI', async (req, res) => {
     const query = req.url.split('?')[1]; // Captura todos los parámetros de consulta
     const url = `http://${WIZ220IO_IP}:${WIZ220IO_PORT}/DOCTL.CGI?${query}`;

     try {
       const response = await axios.get(url);
       res.json(response.data);
     } catch (error) {
       console.error('Error al conectar con WIZ220IO:', error.message);
       res.status(500).json({ message: 'Error al conectar con WIZ220IO', error: error.message });
     }
   });

   app.listen(port, () => {
     console.log(`Servidor corriendo en http://localhost:${port}`);
   });