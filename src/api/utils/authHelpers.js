//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt_config } = require('../../config/vars');

// Helper functions
exports.generateAccessToken = async (user) => {
    const payload = {
        id: user.userId,
        email: user.userName
    };
    return jwt.sign(payload, jwt_config.jwt_secret, { expiresIn: jwt_config.jwt_expiration });
};

exports.generateRefreshToken = () => jwt.sign({}, jwt_config.jwt_secret, { expiresIn: jwt_config.refresh_token_expiration });

// exports.hashPassword = async (password) => {
//     const saltRounds = parseInt(jwt_config.salt_rounds);
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     return hashedPassword;
// };

// exports.comparePasswords = async (password, hashedPassword) => {
//     console.log("password>>>>>>>>",password);
//     console.log("hashedPassword>>>>>>>>",hashedPassword);
//     const isMatch = await bcrypt.compare(password, hashedPassword);
//     console.log("isMatch>>>>>>>>",isMatch);
//     return isMatch;
// };

