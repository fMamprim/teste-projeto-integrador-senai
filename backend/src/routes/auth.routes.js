// backend/src/routes/auth.routes.js
const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const router = Router();

// Define a rota POST /sessions
router.post('/sessions', authController.login);

module.exports = router;