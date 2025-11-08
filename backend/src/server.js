// 1. Carrega o .env (onde está sua DATABASE_URL e JWT_SECRET)
// Faça isso ANTES de qualquer outro import
require('dotenv').config();

// 2. Importa as bibliotecas
const express = require('express');
const cors = require('cors');

// 3. Importa seus arquivos de rotas
const authRoutes = require('./routes/auth.routes');
// (TODO) Importe aqui as outras rotas (users, products, etc.) quando criá-las

// 4. Cria a aplicação Express
const app = express();

// 5. Define a porta (Usamos 3333 para não chocar com o Next.js)
const PORT = process.env.PORT || 3333;


const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes.js');


// 6. Configura os Middlewares GLOBAIS
// Habilita o CORS (para que seu frontend em localhost:3000 possa falar com localhost:3333)
app.use(cors());


app.use(authRoutes);
app.use(userRoutes);


// Habilita o Express a ler JSON do corpo das requisições (Body)
app.use(express.json());

// 7. Define as Rotas da API
// Rota de teste simples
app.get('/', (req, res) => {
  res.json({ message: 'API OrderUp está funcionando!' });
});

// "Liga" as rotas de autenticação (ex: /sessions)
app.use(authRoutes);
// (TODO) "Ligue" aqui as outras rotas quando criá-las
// app.use(userRoutes);
// app.use(productRoutes);

// 8. (Bônus) Middleware para tratar erros 404 (Rotas não encontradas)
// Deve ser uma das últimas rotas a serem declaradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// 9. Inicia o Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});