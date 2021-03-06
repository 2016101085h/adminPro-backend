'use strict'
const express = require('express');
require('dotenv').config();
const { dbConection } = require('./database/config');
const cors = require('cors');

// crear el servidor express

const app = express();

//Configurar cors
app.use(cors());

//Lectura y  parseo del body

app.use(express.json());

// console.log(process.env)

//Base de datos
dbConection();


//Rutas

// rxHNjrrnCv0OlZm4
// mean_user
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/hospital', require('./routes/hospitales'));
app.use('/api/medico', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT)
})