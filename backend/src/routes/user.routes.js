// backend/src/routes/user.routes.js
const { Router } = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = Router();

// Rota para criar usuário
// 1. Passa pelo auth (está logado?)
// 2. Passa pelo role (é 'ADMIN'?)
// 3. Se sim, roda o controller
router.post(
  '/users',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  userController.createUser
);

// Rota para listar usuários
router.get(
  '/users',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  userController.listUsers
);

module.exports = router;