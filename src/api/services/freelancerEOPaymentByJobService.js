const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");

exports.getFreelancerEOPaymentByJob = async (data) => {
    try {
        let sql = "SELECT fl_eo_payment_id, req_id, job_id, job_number, payment_to, payment_to_userType, payment_from, payment_from_userType, payment_amount, credit_amount, DATE_FORMAT(payment_date, '%Y-%m-%d %H:%i %p') as payment_date, reject_remarks, payment_status FROM fl_eo_payment_details WHERE payment_to = ? AND payment_to_userType = ? AND req_id = ?"

        const [resp] = await readPool.query(sql, [data.userId, data.userType, data.req_id]);

        return resp
    } catch (error) {
        logger.info('freelancer eo payment service by job error: ', error);
        console.log('freelancer eo payment service by job error:', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}