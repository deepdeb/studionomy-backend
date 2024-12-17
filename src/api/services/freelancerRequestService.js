const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");

exports.getFreelancerRequest = async (data) => {
    try {
        let sql = "SELECT rb.req_id, rb.req_from, rb.req_from_userType, rb.req_to, rb.req_to_userType, DATE_FORMAT(rb.req_date, '%Y-%m-%d') as req_date, rb.job_id, rb.job_number, rb.event_location, u.name, j.job_startDate, j.job_endDate, j.job_details, j.total_amount, rb.payment, (SELECT payment_amount FROM fl_eo_payment_details WHERE req_id = rb.req_id ORDER BY fl_eo_payment_id DESC LIMIT 1) as last_paid_amount, (SELECT rb.payment - coalesce(sum(payment_amount), 0) FROM fl_eo_payment_details WHERE req_id = rb.req_id AND payment_status = 1) as due_amount FROM request_for_booking rb JOIN jobs j ON rb.job_id = j.job_id JOIN users u ON u.userId = rb.req_to WHERE rb.req_status = 'accepted' AND rb.isDeleted = 0 AND rb.isCancel = 0 AND rb.req_from = ? AND rb.req_from_userType = ?"

        const [resp] = await readPool.query(sql, [data.userId, data.userType]);

        const totalCount = resp.length;
        return [resp, totalCount]
    } catch (error) {
        logger.info('freelancer request service error: ', error);
        console.log('freelancer request service error:', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}