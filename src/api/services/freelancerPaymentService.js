const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");

exports.getFreelancerPayment = async (data) => {
    try {
        let sql = "SELECT rb.req_to, rb.job_id, rb.job_number, u.name, j.job_startDate, j.job_endDate, j.job_details, j.total_amount, rb.payment FROM request_for_booking rb JOIN jobs j ON rb.job_id = j.job_id JOIN users u ON u.userId = rb.req_to WHERE rb.req_status = 'accepted' AND rb.isDeleted = 0 AND rb.isCancel = 0 AND rb.req_from = ? AND rb.req_from_userType = ?"

        const [resp] = await readPool.query(sql, [data.userId, data.userType]);

        const totalCount = resp.length;
        return [resp, totalCount]
    } catch (error) {
        logger.info('freelancer payment service error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}