const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.feedbackStatusChange = async (data) => {
    try {
        let sql = "UPDATE feedback SET isShow = ? WHERE f_id = ?"
        const [resp] = await writePool.query(sql, [data.isShow, data.f_id]);
        return "Feedback status change successfully";
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}