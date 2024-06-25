const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, 'secret_key', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.sendStatus(403);
    }
};

router.post('/login', userController.login);
router.get('/', authenticateJWT, userController.getAllUsers);
router.post('/', authenticateJWT, isAdmin, userController.createUser);
router.put('/', authenticateJWT, isAdmin, userController.updateUser);
router.delete('/:id', authenticateJWT, isAdmin, userController.deleteUser);

module.exports = router;
