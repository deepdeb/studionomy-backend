const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");

exports.getFreelancerRequest = async (data) => {
    try {
        let sql = "SELECT rb.req_id, rb.req_from, rb.req_from_userType, rb.req_to, rb.req_to_userType, DATE_FORMAT(rb.req_date, '%Y-%m-%d') as req_date, rb.job_id, rb.job_number, rb.event_location, u.name, j.job_startDate, j.job_endDate, j.job_details, j.total_amount, rb.payment, (SELECT coalesce(sum(payment_amount), 0) FROM fl_eo_payment_details WHERE req_id = rb.req_id) as total_paid_amount, GROUP_CONCAT(CONCAT(payment_amount, ' - ', DATE_FORMAT(payment_date, '%d-%m-%Y')) ORDER BY fl_eo_payment_id DESC) as payment_details, (SELECT rb.payment - coalesce(sum(credit_amount), 0) FROM fl_eo_payment_details WHERE req_id = rb.req_id AND payment_status = 1) as due_amount FROM request_for_booking rb JOIN jobs j ON rb.job_id = j.job_id JOIN users u ON u.userId = rb.req_to LEFT JOIN fl_eo_payment_details fl ON fl.req_id = rb.req_id WHERE rb.req_status = 'accepted' AND rb.isDeleted = 0 AND rb.isCancel = 0 AND rb.req_from = ? AND rb.req_from_userType = ? GROUP BY rb.req_id,rb.req_from, rb.req_from_userType, rb.req_to, rb.req_to_userType, rb.req_date, rb.job_id, rb.job_number, rb.event_location, u.name, j.job_startDate, j.job_endDate, j.job_details, j.total_amount, rb.payment"

        const [resp] = await readPool.query(sql, [data.userId, data.userType]);

        return resp
    } catch (error) {
        logger.info('freelancer request service error: ', error);
        console.log('freelancer request service error:', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}