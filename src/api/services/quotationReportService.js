const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");

exports.getQuotationListReport = async (data) => {
    try {
        let sql = "SELECT q.quotation_number, q.job_details, DATE_FORMAT(q.job_startDate, '%Y-%d-%m') as job_startDate, DATE_FORMAT(q.job_endDate, '%Y-%d-%m') as job_endDate, q.deliverables, q.cust_firstName, q.cust_lastName, q.cust_phoneNo, q.cust_altPhoneNo, q.cust_email, q.address, q.event_location, q.total_amount FROM quotations q WHERE q.userId = ? AND q.userType = ? AND q.job_startDate >= ? AND q.job_endDate <= ?"

        const [resp] = await readConn.query(sql, [data.userId, data.userType, data.start_date, data.end_date]);

        if (resp) {
            return resp;
        }
    } catch (error) {
        console.log("quotation list report service error: ", error);
        logger.error("quotation list report service error: ", error);
        return false;
    }
}
