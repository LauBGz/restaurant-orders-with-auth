//Importar librerias
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

//Creamos servidor
const servidor = express();

//Importar archivo lockUp
const lockUpContent = fs.readFileSync('lockUp.json');
const lockUp = JSON.parse(lockUpContent);

//Configuramos middleware
servidor.use(bodyParser.json())
servidor.use(cookieParser())
servidor.use(helmet())

//Rutas externas: ponerlas debajo para que haga el body parser primero
require('./routes/auth')(servidor);
require('./routes/crud')(servidor);

//Configuración servidor
servidor.listen(3000, () => {
  console.log("Escuchando en el puerto 3000");
})


