const jwt = require('jsonwebtoken');
const { jwt_config } = require('../../config/vars');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    // Verify the token
    jwt.verify(token.replace('Bearer ', ''), jwt_config.jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        // If the token is valid, you can access the decoded information (e.g., user data)
        req.user = decoded;
        next();
    });
};

module.exports = authenticateToken;