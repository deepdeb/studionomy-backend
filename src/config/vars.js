require('dotenv').config();
var path = require('path');
const BASEPATH = path.resolve(__dirname, "../..");
const FILEPATH = BASEPATH + '/static/uploads/';
module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    FILEPATH: FILEPATH,
    logs: process.env.NODE_ENV === 'prod' ? 'test' : 'dev',
    jwt_config: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expiration: process.env.JWT_EXPIRATION,
        refresh_token_expiration: process.env.REFRESH_TOKEN_EXPIRATION,
        salt_rounds: process.env.SALT_ROUNDS
    },
    client_url: process.env.CLIENT_URL,
    client_domain: process.env.CLIENT_DOMAIN,
    reset_expiration: process.env.RESET_TOKEN_EXPIRATION
};

