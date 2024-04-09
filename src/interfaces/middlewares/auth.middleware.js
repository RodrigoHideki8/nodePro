const jwt = require('jsonwebtoken');

class AuthenticationService {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    generateToken(payload) {
        return jwt.sign(payload, this.secretKey);
    }

    verifyToken(token) {
        try {
            return token === this.secretKey;
        } catch (error) {
            throw new Error('Token inválido');
        }
    }

    authenticateUser(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token de autenticação não fornecido' });
        }

        try {
            const decoded = this.verifyToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token de autenticação inválido' });
        }
    }
}

module.exports = AuthenticationService;