const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.quotationByQuoteNum = async(data) => {
try {
    const sql = "SELECT job_details, cust_firstName, cust_lastName, DATE_FORMAT(job_startDate, '%d-%m-%y') as job_startDate, DATE_FORMAT(job_endDate, '%d-%m-%y') as job_endDate, event_location, cust_email, cust_phoneNo, cust_altPhoneNo, total_amount, deliverables FROM quotations WHERE quotation_number = ? AND userId = ? AND userType = ?"
    const [resp] = await readPool.query(sql, [data.quotation_number, data.userId, data.userType])
    return resp;
} catch (error) {
    logger.error(error);
    return res.json({ success: false, status: 400, message: res.message, response: []})
}
}