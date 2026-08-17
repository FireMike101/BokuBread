const jwt = require('jsonwebtoken');

// middleware to verify token
exports.protect = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const parts = authHeader.split(' ');
    const token = parts.length === 2 && /^Bearer$/i.test(parts[0]) ? parts[1] : parts[0];

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: 'Server error: JWT secret not configured' });
        }

        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'not authorized, token invalid' });
    }
};

