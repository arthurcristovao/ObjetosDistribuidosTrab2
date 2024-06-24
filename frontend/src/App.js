import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './styles/styles.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="App">
            <UserForm userToEdit={userToEdit} fetchUsers={fetchUsers} />
            <UserList users={users} fetchUsers={fetchUsers} setUserToEdit={setUserToEdit} />
        </div>
    );
};

export default App;
