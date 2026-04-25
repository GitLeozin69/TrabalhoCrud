const { Produto } = require('../models');

const criarProduto = async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;

    if (!nome || preco === undefined || estoque === undefined) {
      return res.status(400).json({ erro: 'Nome, preço e estoque são obrigatórios.' });
    }

    const produto = await Produto.create({ nome, preco, estoque });

    return res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao criar produto.' });
  }
};

const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    return res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao listar produtos.' });
  }
};

const buscarProdutoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    return res.status(200).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar produto.' });
  }
};

const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, estoque } = req.body;

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    await produto.update({ nome, preco, estoque });

    return res.status(200).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao atualizar produto.' });
  }
};

const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    await produto.destroy();

    return res.status(200).json({ mensagem: 'Produto deletado com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao deletar produto.' });
  }
};

module.exports = {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto
};