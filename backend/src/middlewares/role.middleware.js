// src/middlewares/role.middleware.js

// Esta função recebe a lista de "roles" permitidos (ex: ['ADMIN'])
function roleMiddleware(allowedRoles) {
  
  // E retorna o middleware real que o Express vai usar
  return (req, res, next) => {
    
    // 1. Este middleware RODA DEPOIS do auth.middleware
    // Então, ele espera que req.user já exista
    if (!req.user || !req.user.role) {
      // Isso é um erro de servidor, mas por segurança, tratamos como Forbidden
      return res.status(403).json({ error: 'Forbidden: User role not available' });
    }

    const { role } = req.user; // Ex: 'WAITER'

    // 2. Verifica se a role do usuário está na lista de permissão
    if (allowedRoles.includes(role)) {
      // 3. Se estiver, permite o acesso
      return next(); 
    } else {
      // 4. Se não, retorna erro 403 Forbidden
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
  };
}

// Exporta a função
module.exports = roleMiddleware;