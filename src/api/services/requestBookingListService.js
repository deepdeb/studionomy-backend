const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.requestBookingList = async (data) => {
    try {
        let sql = "SELECT u.userId,u.userType,u.orgName,u.name,u.mobile,u.alt_mobile,r.req_id,r.job_id,r.job_number,r.event_location,r.payment,r.skills,r.message,r.req_date, r.req_status, DATE_FORMAT(r.update_date, '%Y-%m-%d') as update_date from request_for_booking as r,users as u where r.isDeleted=0 AND r.isCancel = 0 AND r.req_to = ? AND r.req_to_userType = ? AND r.req_from = u.userId AND r.req_from_userType = u.userType"
        const [resp] = await readConn.query(sql, [Number(data.req_to), Number(data.req_to_userType)]);
        return resp ? resp : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
};
