const bcrypt = require('bcrypt');
const connection = require('../models/db');

const createAdminUser = async () => {
    const nome = 'Admin';
    const telefone = '123456789';
    const email = 'admin@example.com';
    const senha = 'admin123'; // Defina a senha desejada aqui
    const isAdmin = true;

    const hashedPassword = await bcrypt.hash(senha, 10);

    const query = 'INSERT INTO usuarios (nome, telefone, email, senha, isAdmin) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nome, telefone, email, hashedPassword, isAdmin], (err, results) => {
        if (err) {
            console.error('Erro ao inserir usuário administrador:', err);
            return;
        }
        console.log('Usuário administrador inserido com sucesso:', results);
    });
};

createAdminUser();
