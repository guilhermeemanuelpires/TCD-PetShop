const sequelize = require('../database/index');

var conexao = sequelize.authenticate()
  .then(function () {
    console.log('Conexão com o MySQL foi estabelecida com sucesso');
  })
  .catch(function (err) {
    console.log('Não foi possível se conectar com o banco de dados MySql : ' + err);
  }).done();

sequelize.User = sequelize.import('./User.js');

sequelize.sync();

module.exports = sequelize;