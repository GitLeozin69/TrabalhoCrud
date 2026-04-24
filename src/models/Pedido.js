const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Pedido = sequelize.define('Pedido', {
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = Pedido;