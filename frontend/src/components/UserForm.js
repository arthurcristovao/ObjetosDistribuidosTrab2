// Arquivo: UserForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ userToEdit, fetchUsers, token }) => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        if (userToEdit) {
            setNome(userToEdit.nome);
            setTelefone(userToEdit.telefone);
            setEmail(userToEdit.email);
            setIsAdmin(userToEdit.isAdmin);
            setId(userToEdit.id);
        }
    }, [userToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { nome, telefone, email, senha, isAdmin };

        try {
            if (id) {
                await axios.put('http://localhost:3001/users', { id, ...user }, { headers: { Authorization: token } });
            } else {
                await axios.post('http://localhost:3001/users', user, { headers: { Authorization: token } });
            }
            fetchUsers();
            setNome('');
            setTelefone('');
            setEmail('');
            setSenha('');
            setIsAdmin(false);
            setId(null);
        } catch (error) {
            console.error('Erro ao criar/editar usuário:', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <h2>{id ? 'Editar Usuário' : 'Criar Usuário'}</h2>
            <div className="user-form-row">
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                />
            </div>
            <div className="user-form-row">
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
            </div>
            <div className="user-form">
                <label>
                    Admin:
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                </label>
            </div>
            <div className="user-form-center">
                <button type="submit" className="width60">{id ? 'Editar' : 'Criar'}</button>
            </div>
            <br></br>
        </form>
    );
};

export default UserForm;
