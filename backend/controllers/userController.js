const connection = require('../models/db');

exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createUser = (req, res) => {
    const { nome, telefone, email } = req.body;
    connection.query('INSERT INTO usuarios (nome, telefone, email) VALUES (?, ?, ?)', [nome, telefone, email], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, nome, telefone, email });
    });
};

exports.updateUser = (req, res) => {
    const { id, nome, telefone, email } = req.body;
    connection.query('UPDATE usuarios SET nome = ?, telefone = ?, email = ? WHERE id = ?', [nome, telefone, email, id], (err) => {
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
