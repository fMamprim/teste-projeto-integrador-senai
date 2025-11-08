// backend/src/controllers/auth.controller.js
const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  // 1. Pegar dados do body
  const { username, password } = req.body;

  try {
    // 2. Buscar o usuário no banco pelo username
    const sqlQuery = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(sqlQuery, [username]);

    const user = result.rows[0];

    // 3. Se não existir, retorna 401
    if (!user) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    // 4. Comparar a senha do formulário com o hash do banco
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    // 5. Se a senha estiver errada, retorna 401
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    // 6. Se deu tudo certo, gerar o token JWT
    // (Não inclua o hash da senha no payload!)
    const payload = {
      userId: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' }); // Token expira em 1 dia

    // 7. Retornar o token e os dados do usuário
    res.status(200).json({
      token: token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};