import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ userToEdit, fetchUsers }) => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState(null);

    useEffect(() => {
        if (userToEdit) {
            setNome(userToEdit.nome);
            setTelefone(userToEdit.telefone);
            setEmail(userToEdit.email);
            setId(userToEdit.id);
        }
    }, [userToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { nome, telefone, email };

        if (id) {
            await axios.put('http://localhost:3001/users', { id, ...user });
        } else {
            await axios.post('http://localhost:3001/users', user);
        }

        fetchUsers();
        setNome('');
        setTelefone('');
        setEmail('');
        setId(null);
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">{id ? 'Editar' : 'Criar'}</button>
        </form>
    );
};

export default UserForm;
