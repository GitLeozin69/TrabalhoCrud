const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.post('/usuarios', usuarioController.criarUsuario);
router.get('/usuarios', usuarioController.listarUsuarios);
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);
router.put('/usuarios/:id', usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', usuarioController.deletarUsuario);

module.exports = router;