const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obter todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter usuários' });
  }
};

// Adicionar novo usuário
const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

module.exports = {
  getAllUsers,
  addUser,
};
