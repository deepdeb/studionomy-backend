const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.bookingStatusByDates = async (data) => {
    try {
        let sql = "SELECT DATE_FORMAT(r.req_date, '%Y-%m-%d') as req_date, r.req_status from request_for_booking as r where r.isDeleted=0 AND r.isCancel = 0 AND r.req_to = ? AND r.req_to_userType = ? AND r.req_date IN (?)"
        const [resp] = await readConn.query(sql, [data.userId, Number(data.userType), data.datesToCheck]);
        return resp ? resp : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
};