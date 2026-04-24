const { Sequelize } = require('sequelize');
const databaseConfig = require('./database');

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect
  }
);

module.exports = sequelize;