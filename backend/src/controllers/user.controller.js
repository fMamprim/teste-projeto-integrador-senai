// backend/src/controllers/user.controller.js
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

// [POST] /users
exports.createUser = async (req, res) => {
  // Pega os dados do corpo
  const { name, username, password, role } = req.body;

  // Regra de Negócio: Antes de salvar, gerar o hash da senha
  try {
    const password_hash = await bcrypt.hash(password, 10);

    // Insere no banco
    const sqlQuery = `
      INSERT INTO users (name, username, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, username, role, created_at
    `;
    const values = [name, username, password_hash, role];

    const result = await pool.query(sqlQuery, values);
    const newUser = result.rows[0];

    // Retorna 201 Created com o novo usuário (sem a senha!)
    res.status(201).json(newUser);

  } catch (err) {
    // 23505 é o código de erro do PostgreSQL para "unique violation"
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Este nome de usuário já existe.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

// [GET] /users
exports.listUsers = async (req, res) => {
  try {
    // Busca todos os usuários, mas NUNCA retorna o password_hash
    const sqlQuery = 'SELECT id, name, username, role FROM users ORDER BY name ASC';
    const result = await pool.query(sqlQuery);
    
    res.status(200).json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};