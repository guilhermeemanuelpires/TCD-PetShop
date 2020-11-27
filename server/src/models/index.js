const sequelize = require('../database/index');

var conexao = sequelize.authenticate()
  .then(function () {
    console.log('Conexão com o MySQL foi estabelecida com sucesso');
  })
  .catch(function (err) {
    console.log('Não foi possível se conectar com o banco de dados MySql : ' + err);
  }).done();


sequelize.User = sequelize.import('./User.js');
sequelize.Pet = sequelize.import('./Pet.js');
sequelize.Endereco = sequelize.import('./Endereco.js');
sequelize.Servico = sequelize.import('./Servico.js');

/* Relacionamneto */
sequelize.User.hasMany(sequelize.Pet, { foreignKey: 'resp' });
sequelize.Pet.belongsTo(sequelize.User, { foreignKey: 'resp' });

sequelize.Pet.hasMany(sequelize.Servico, { foreignKey: 'petid' });
sequelize.Servico.belongsTo(sequelize.Pet, { foreignKey: 'petid' });

sequelize.Endereco.hasMany(sequelize.Servico, { foreignKey: 'enderecoid' });
sequelize.Servico.belongsTo(sequelize.Endereco, { foreignKey: 'enderecoid' });





sequelize.sync();

module.exports = sequelize;