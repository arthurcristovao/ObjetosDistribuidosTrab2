import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './styles/styles.css';
import { jwtDecode } from 'jwt-decode'; // Importando corretamente a função nomeada jwtDecode

const App = () => {
    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users', { headers: { Authorization: token } });
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUsers();
        }
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/users/login', { email, senha });
            const decodedToken = jwtDecode(response.data.token); // Decodificando o token JWT
            setToken(`Bearer ${response.data.token}`);
            setIsAuthenticated(true);
            setIsAdmin(decodedToken.isAdmin); // Verificando se o usuário é administrador
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    const handleLogout = () => {
        setToken(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <div className="App">
            {!isAuthenticated ? (
                <form onSubmit={handleLogin} className="login-form">
                    <h2>Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div className="user-management">
                    <button className="logout-button" onClick={handleLogout}>Deslogar</button>
                    {isAdmin ? <UserForm userToEdit={userToEdit} fetchUsers={fetchUsers} token={token} /> : null}
                    <UserList users={users} fetchUsers={fetchUsers} setUserToEdit={setUserToEdit} token={token} isAdmin={isAdmin} />
                </div>
            )}
        </div>
    );
};

export default App;
