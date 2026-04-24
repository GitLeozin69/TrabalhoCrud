const sequelize = require('../config/sequelize');

const Usuario = require('./Usuario');
const Produto = require('./Produto');
const Pedido = require('./Pedido');

Usuario.hasMany(Pedido, {
  foreignKey: 'usuarioId'
});

Pedido.belongsTo(Usuario, {
  foreignKey: 'usuarioId'
});

Produto.hasMany(Pedido, {
  foreignKey: 'produtoId'
});

Pedido.belongsTo(Produto, {
  foreignKey: 'produtoId'
});

module.exports = {
  sequelize,
  Usuario,
  Produto,
  Pedido
};