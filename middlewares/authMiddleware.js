const jwt = require('jsonwebtoken');
const Token = require('../models/tokenModel');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Invalid token format.' });
    } try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const tokenRecord = await Token.findOne({ userId: decoded.userId, deviceId: decoded.deviceId, token });
        if (!tokenRecord) {
            return res.status(401).json({ error: 'Invalid token.' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;