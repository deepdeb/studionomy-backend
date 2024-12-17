const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");

exports.submitPayment = async (data) => {
    try {
        let sql = "INSERT INTO fl_eo_payment_details (req_id, job_id, job_number, payment_to, payment_to_userType, payment_from, payment_from_userType, payment_amount) VALUES (?,?,?,?,?,?,?,?)"

        const [resp] = await writePool.query(sql, [data.req_id, data.job_id, data.job_number, data.payment_to, data.payment_to_userType, data.payment_from, data.payment_from_userType, data.payment_amount]);

        return "Payment submitted successfully"
    } catch (error) {
        logger.info('submit payment service error: ', error);
        console.log('submit payment service error:', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}