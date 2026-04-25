const { Pedido, Usuario, Produto } = require('../models');

const criarPedido = async (req, res) => {
  try {
    const { usuarioId, produtoId, quantidade } = req.body;

    if (!usuarioId || !produtoId || !quantidade) {
      return res.status(400).json({
        erro: 'usuarioId, produtoId e quantidade são obrigatórios.'
      });
    }

    if (quantidade <= 0) {
      return res.status(400).json({
        erro: 'A quantidade deve ser maior que zero.'
      });
    }

    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    const produto = await Produto.findByPk(produtoId);

    if (!produto) {
      return res.status(404).json({
        erro: 'Produto não encontrado.'
      });
    }

    if (quantidade > produto.estoque) {
      return res.status(400).json({
        erro: 'Quantidade solicitada maior que o estoque disponível.'
      });
    }

    const valorTotal = quantidade * Number(produto.preco);

    const pedido = await Pedido.create({
      usuarioId,
      produtoId,
      quantidade,
      valorTotal
    });

    await produto.update({
      estoque: produto.estoque - quantidade
    });

    return res.status(201).json(pedido);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao criar pedido.'
    });
  }
};

const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [Usuario, Produto]
    });

    return res.status(200).json(pedidos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao listar pedidos.'
    });
  }
};

const buscarPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(id, {
      include: [Usuario, Produto]
    });

    if (!pedido) {
      return res.status(404).json({
        erro: 'Pedido não encontrado.'
      });
    }

    return res.status(200).json(pedido);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao buscar pedido.'
    });
  }
};

const atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({
        erro: 'Pedido não encontrado.'
      });
    }

    if (!quantidade || quantidade <= 0) {
      return res.status(400).json({
        erro: 'Informe uma quantidade válida.'
      });
    }

    const produto = await Produto.findByPk(pedido.produtoId);

    if (!produto) {
      return res.status(404).json({
        erro: 'Produto vinculado ao pedido não encontrado.'
      });
    }

    const diferencaQuantidade = quantidade - pedido.quantidade;

    if (diferencaQuantidade > produto.estoque) {
      return res.status(400).json({
        erro: 'Quantidade maior que o estoque disponível.'
      });
    }

    const novoValorTotal = quantidade * Number(produto.preco);

    await pedido.update({
      quantidade,
      valorTotal: novoValorTotal
    });

    await produto.update({
      estoque: produto.estoque - diferencaQuantidade
    });

    return res.status(200).json(pedido);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao atualizar pedido.'
    });
  }
};

const deletarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({
        erro: 'Pedido não encontrado.'
      });
    }

    const produto = await Produto.findByPk(pedido.produtoId);

    if (produto) {
      await produto.update({
        estoque: produto.estoque + pedido.quantidade
      });
    }

    await pedido.destroy();

    return res.status(200).json({
      mensagem: 'Pedido deletado com sucesso.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao deletar pedido.'
    });
  }
};

module.exports = {
  criarPedido,
  listarPedidos,
  buscarPedidoPorId,
  atualizarPedido,
  deletarPedido
};