// src/middlewares/auth.middleware.js

// Importa a biblioteca de token
const jwt = require('jsonwebtoken');

// Pega o seu segredo do JWT do arquivo .env
const jwtSecret = process.env.JWT_SECRET;

// Este é o middleware
function authMiddleware(req, res, next) {
  // 1. Pegar o token do cabeçalho Authorization
  const authHeader = req.headers.authorization;

  // Se não houver cabeçalho, retorna erro
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // O cabeçalho vem como "Bearer <token>". Vamos separar
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  // Verifica se o início é "Bearer"
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformatted' });
  }

  // 2. Usar jsonwebtoken.verify para checar se é válido
  try {
    // Tenta verificar o token
    const payload = jwt.verify(token, jwtSecret);

    // 3. Se for válido, anexa os dados (payload) no request
    // O payload é o que você salvou no token (ex: { userId: '...', role: 'ADMIN' })
    req.user = payload; // Agora req.user estará disponível em todas as rotas
    
    // Chama a próxima função (o controller da rota)
    return next();

  } catch (err) {
    // 4. Se não for válido, retorna erro 401 Unauthorized
    return res.status(401).json({ error: 'Token invalid' });
  }
}

// Exporta a função para ser usada em outros arquivos
module.exports = authMiddleware;