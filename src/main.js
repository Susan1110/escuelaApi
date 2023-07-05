const path = require('path');
const express = require('express');
const cors = require('cors');
const estudiante = require('./routes/estudiante');

// CREACION DEL SERVIDOR
const app = express();
const PORT = 6000;

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server runnig at port ${PORT}`);
});

// RUTAS
app.use('/estudiante', estudiante);
