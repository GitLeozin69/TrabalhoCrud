const app = require('./src/app');
const { sequelize } = require('./src/models');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com MariaDB realizada com sucesso.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao iniciar servidor:', error);
  });