const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.myRequestBookingList = async (data) => {
    try {
        // let sql = "SELECT u.userId,u.userType,u.orgName,u.name,u.mobile,u.alt_mobile,r.req_id,r.job_id,r.job_number,r.event_location,r.payment,r.skills,r.message,DATE_FORMAT(r.req_date, '%Y-%m-%d') as req_date,r.req_to,r.req_to_userType, r.req_status, DATE_FORMAT(r.update_date, '%Y-%m-%d') as update_date from request_for_booking as r,users as u where r.isDeleted=0 AND r.isCancel = 0 AND r.req_from = ? AND r.req_from_userType = ? AND r.req_to = u.userId AND r.req_to_userType = u.userType"

        // let sql = "SELECT u.userId,u.userType,u.orgName,u.location,u.address,(select u.name from users as u where u.userId = r.req_to) as freelancerName, (select u.mobile from users as u where u.userId = r.req_to) as freelancerMobile, u.mobile as studioMobile,u.alt_mobile as studioAltMobile,r.req_id,r.job_id,r.job_number,r.event_location,r.payment,r.skills,r.message,DATE_FORMAT(r.req_date, '%Y-%m-%d') as req_date,r.req_to,r.req_to_userType, r.req_status, DATE_FORMAT(r.update_date, '%Y-%m-%d') as update_date from request_for_booking as r JOIN users u ON r.req_from = u.userId where r.isDeleted=0 AND r.isCancel = 0 AND r.req_from = ? AND r.req_from_userType = ?"

        let sql = "SELECT u.userId, u.userType, u.orgName, u.location, u.address, u2.name AS freelancerName, u2.mobile AS freelancerMobile, u.mobile AS studioMobile, u.alt_mobile AS studioAltMobile, r.req_id, r.job_id, r.job_number, r.event_location, r.payment, r.skills, r.message, DATE_FORMAT(r.req_date, '%Y-%m-%d') AS req_date, r.req_to, r.req_to_userType, r.req_status, DATE_FORMAT(r.update_date, '%Y-%m-%d') AS update_date FROM request_for_booking AS r JOIN users AS u ON r.req_from = u.userId LEFT JOIN users AS u2 ON r.req_to = u2.userId WHERE r.isDeleted = 0 AND r.isCancel = 0 AND r.req_from = ? AND r.req_from_userType = ?"
        const [resp] = await readConn.query(sql, [Number(data.req_from), Number(data.req_from_userType)]);
        return resp ? resp : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
};
