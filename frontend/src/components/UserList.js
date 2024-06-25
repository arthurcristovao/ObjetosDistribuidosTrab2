import React from 'react';
import axios from 'axios';

const UserList = ({ users, fetchUsers, setUserToEdit, token, isAdmin }) => {
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/users/${id}`, { headers: { Authorization: token } });
        fetchUsers();
    };

    return (
        <div className="user-list">
            <h2>Lista de Usuários</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        {isAdmin ? <th>Admin</th> : null}
                        {isAdmin ? <th>Ações</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.nome}</td>
                            <td>{user.telefone}</td>
                            <td>{user.email}</td>
                            {isAdmin ? <td>{user.isAdmin ? 'Sim' : 'Não'}</td> : null}
                            {isAdmin ? (
                                <td>
                                    <button className="edit" onClick={() => setUserToEdit(user)}>Editar</button>
                                    <button className="delete" onClick={() => handleDelete(user.id)}>Excluir</button>
                                </td>
                            ) : null }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
