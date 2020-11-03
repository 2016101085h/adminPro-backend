'use strict'
const express = require('express');
require('dotenv').config();
const { dbConection } = require('./database/config');
const cors = require('cors');

// crear el servidor express

const app = express();

//Configurar cors
app.use(cors());

dbConection();
// console.log(process.env)

//Base de datos


//Rutas

// rxHNjrrnCv0OlZm4
// mean_user
app.get('/', (request, response) => {
    response.json({
        ok: true,
        msg: 'Hola mundo'
    })
})

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT)
})