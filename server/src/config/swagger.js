const host = 'localhost:3000';

const swaggerDefinition = {
  info: {
    title: "TCD Pet Shop",
    version: "1.0.0",
    description: "Aplicação projeto TCD(trabalho de conclusão da disciplina)",
    contact: {
      name: "Guilherme Pires",
      url: "https://github.com/guilhermeemanuelpires",
      email: "guilhermeemanuel45@gmail.com",
    },      
  },
  securityDefinitions: {},
  basePath: "/",
  host : host
};

module.exports = options = {
  swaggerDefinition,
  apis: [
    "./src/router.js",
    "./src/models/User.js"
  ],
};

