// backend/src/config/database.js
const { Pool } = require('pg');

// O 'pg' vai ler automaticamente as variáveis de ambiente
// (incluindo a DATABASE_URL do seu .env)
const pool = new Pool();

module.exports = pool;