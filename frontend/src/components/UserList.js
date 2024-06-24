import React from 'react';
import axios from 'axios';

const UserList = ({ users, fetchUsers, setUserToEdit }) => {
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/users/${id}`);
        fetchUsers();
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.nome}</td>
                        <td>{user.telefone}</td>
                        <td>{user.email}</td>
                        <td>
                            <button className="edit" onClick={() => setUserToEdit(user)}>Editar</button>
                            <button className="delete" onClick={() => handleDelete(user.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;
