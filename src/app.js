const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API CRUD rodando com sucesso!' });
});

app.use(usuarioRoutes);

module.exports = app;