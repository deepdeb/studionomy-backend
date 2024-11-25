const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.updatePassword = async(data) => {
    try {
        let sql = 'UPDATE users SET password = ? WHERE email = ?'
        const [resp] = await writePool.query(sql, [data.changePassword, data.toRegisteredMail])
        return 'Password changed successfully';
    } catch (error) {
        logger.error(err);
        return false;
    }
}