const { Usuario } = require('../models');

const criarUsuario = async (req, res) => {
  try {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
    }

    const usuario = await Usuario.create({ nome, email });

    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao criar usuário.' });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();

    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao listar usuários.' });
  }
};

const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar usuário.' });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    await usuario.update({ nome, email });

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
  }
};

const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    await usuario.destroy();

    return res.status(200).json({ mensagem: 'Usuário deletado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao deletar usuário.' });
  }
};

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario
};