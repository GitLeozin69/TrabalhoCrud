const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API CRUD rodando com sucesso!' });
});

module.exports = app;