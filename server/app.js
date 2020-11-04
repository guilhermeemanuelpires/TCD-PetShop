const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const environment = process.env.NODE_ENV || 'development';
const router = require('./src/router');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const options = require('./src/config/swagger');

const swaggerSpec = swaggerJSDoc(options);

// development
app.use(cors());
app.use(bodyParser.json());

// Carrega SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// importa models
require('./src/models');

router(app);

if (environment === 'test') {
  module.exports = app;
} else {
  app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
  });
}

