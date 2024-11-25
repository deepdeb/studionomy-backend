const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.query = async (data) => {
    try {
        let sql = "INSERT INTO queries (userId,name,mobile,alt_mobile,email,querie_details) VALUES(?,?,?,?,?,?)"
        const [resp] = await writePool.query(sql, [data.userId, data.name, data.mobile, data.alt_mobile, data.email, data.querie_details]);
        return resp.insertId;
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}