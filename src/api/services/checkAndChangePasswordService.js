const writePool = require('../../config/mysql').writePool
const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.checkAndChangePassword = async(data) => {
    try {

        let checkSql = "SELECT userId FROM users WHERE passwordChangeOTP = ? AND password = ? AND userId = ? AND isDeleted = 0"
        const [checkResp] = await readPool.query(checkSql, [data.changePasswordOTP, data.oldPassword, data.userId])

        if(checkResp.length > 0) {
            let sql = 'UPDATE users SET password = ? WHERE userId = ?'
            const [resp] = await writePool.query(sql, [data.newPassword, data.userId])
            if(resp) {
                return "Password changed successfully"
            }
        } else {
            return "Old password or OTP does not match"
        }


    } catch (error) {
        logger.error(err);
        return false;
    }
}