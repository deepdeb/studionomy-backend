const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.profileShare = async (data) => {
    try {
        let sql = "UPDATE users SET profile_share = ? WHERE userId = ?"
        const [resp] = await writePool.query(sql, [data.profile_share, data.userId]);
        return "Your profile status change successfully";
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}