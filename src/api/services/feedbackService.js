const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.feedback = async (data) => {
    try {
        let sql = "INSERT INTO feedback (userId,name,mobile,alt_mobile,email,profileImg,feedback_details) VALUES(?,?,?,?,?,?,?)"
        const [resp] = await writePool.query(sql, [data.userId, data.name, data.mobile, data.alt_mobile, data.email, data.profileImg, data.feedback_details]);
        return resp.insertId;
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}