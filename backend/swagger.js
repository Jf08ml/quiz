const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Quiz',
    version: '1.0.0',
    description: 'This is an API for an interactive quiz system.',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Servidor de Desarrollo',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
