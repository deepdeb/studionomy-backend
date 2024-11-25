const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.updateOTPinDB = async(data) => {
    try {
        let sql = 'UPDATE users SET passwordChangeOTP = ? WHERE userId = ?'
        const [resp] = await writePool.query(sql, [data.generatedOTP, data.userId])
        if(resp.affectedRows > 0) {
            console.log('>>>', resp)
            return resp
        }
    } catch (error) {
        logger.error(err);
        return false;
    }
}