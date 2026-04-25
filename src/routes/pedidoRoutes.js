const express = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.post('/pedidos', pedidoController.criarPedido);
router.get('/pedidos', pedidoController.listarPedidos);
router.get('/pedidos/:id', pedidoController.buscarPedidoPorId);
router.put('/pedidos/:id', pedidoController.atualizarPedido);
router.delete('/pedidos/:id', pedidoController.deletarPedido);

module.exports = router;