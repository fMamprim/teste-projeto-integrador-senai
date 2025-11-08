'use client'; 

import { useState } from 'react';
import axios from 'axios'; // 1. Importa o Axios

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para guardar erros

  // 2. Transforma a função em "async" para poder usar "await"
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError(null); // Limpa erros anteriores

    try {
      // 3. Tenta fazer a chamada para a API (lembre-se: porta 3333)
      const response = await axios.post('http://localhost:3333/sessions', {
        username: username,
        password: password,
      });

      // 4. Se deu certo (código 200)
      console.log('Login bem-sucedido!', response.data);
      
      // 5. GUARDA O TOKEN (Meta da Sprint)
      // O localStorage é o "HD" do navegador. 
      // É a forma mais simples de guardar o token.
      const { token, user } = response.data;
      localStorage.setItem('orderup_token', token);
      localStorage.setItem('orderup_user', JSON.stringify(user));

      // 6. Redireciona o usuário (Ex: para o dashboard)
      // (Por enquanto, vamos só dar um alerta)
      alert(`Login feito com sucesso! Bem-vindo, ${user.name}`);
      
      // TODO: Redirecionar para a página correta (ex: /dashboard/garcom)

    } catch (err) {
      // 7. Se deu errado
      console.error('Falha no login:', err);
      
      // Verifica se é um erro da API (ex: 401 Senha errada)
      if (err.response && err.response.status === 401) {
        setError('Usuário ou senha inválidos.');
      } else {
        setError('Erro ao conectar com o servidor. Tente novamente.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">OrderUp - Login</h1>
        
        <form onSubmit={handleSubmit}>
          {/* ... inputs de username e password (sem mudança) ... */}
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Usuário</label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded text-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Entrar
          </button>

          {/* 8. Mostra a mensagem de erro, se houver */}
          {error && (
            <p className="mt-4 text-center text-red-500">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}