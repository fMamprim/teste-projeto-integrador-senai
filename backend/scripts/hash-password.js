// backend/scripts/hash-password.js
const bcrypt = require('bcryptjs');

// Mude '123456' para a senha que você quiser
const senha = '123456';
const hash = bcrypt.hashSync(senha, 10);

console.log('--- Senha Original ---');
console.log(senha);
console.log('--- Hash (para o banco) ---');
console.log(hash);