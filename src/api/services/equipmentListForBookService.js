const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getEquipmentListForBook = async (data) => {
    try {
        let sql = "SELECT i.inv_code,i.inv_id from inventary as i where i.userId = ? AND i.userType = ? AND i.isDeleted = 0 AND i.rentout = 1"
        const [resp] = await readConn.query(sql, [data.req_to, data.req_to_userType]);

        return resp ? resp : [];
    }
    catch (err) {
        logger.error('equipment list for book service error:', err);
        console.log('equipment list for book service error:', err);
        return false;
    }
}