const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../models/db');

exports.getAllUsers = (req, res) => {
    connection.query('SELECT id, nome, telefone, email, isAdmin FROM usuarios', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createUser = async (req, res) => {
    const { nome, telefone, email, senha, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    connection.query('INSERT INTO usuarios (nome, telefone, email, senha, isAdmin) VALUES (?, ?, ?, ?, ?)', [nome, telefone, email, hashedPassword, isAdmin], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, nome, telefone, email, isAdmin });
    });
};

exports.updateUser = async (req, res) => {
    const { id, nome, telefone, email, senha, isAdmin } = req.body;
    const hashedPassword = senha ? await bcrypt.hash(senha, 10) : undefined;
    connection.query('UPDATE usuarios SET nome = ?, telefone = ?, email = ?, isAdmin = ?' + (hashedPassword ? ', senha = ?' : '') + ' WHERE id = ?', 
    [nome, telefone, email, isAdmin, hashedPassword, id].filter(v => v !== undefined), (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
};

exports.login = async (req, res) => {
    const { email, senha } = req.body;
    connection.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }
        const user = results[0];
        const isValidPassword = await bcrypt.compare(senha, user.senha);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'secret_key', { expiresIn: '1h' });
        res.json({ token, isAdmin: user.isAdmin });
    });
};
