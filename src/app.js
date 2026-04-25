const express = require('express');

const usuarioRoutes = require('./routes/usuarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API CRUD rodando com sucesso!' });
});

app.use(usuarioRoutes);
app.use(produtoRoutes);
app.use(pedidoRoutes);

module.exports = app;


