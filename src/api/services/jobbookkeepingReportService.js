const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");

exports.getJobbookkeepingListReport = async (data) => {
    try {
        let sql = "SELECT jbk.jb_id,jbk.payment_date,jbk.job_id,jbk.job_number,jbk.job_value,jbk.job_details,jbk.payment_description,jbk.payment_amount,jbk.payment_type,jbk.payment_status,jbk.profit,j.cust_phoneNo FROM job_book_keeping jbk LEFT JOIN jobs j ON jbk.userId = j.userId WHERE jbk.isDeleted = 0 AND jbk.userId = " + data.userId + " AND jbk.userType = " + data.userType + " AND jbk.job_number = j.job_number AND jbk.job_id = j.job_id AND jbk.payment_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "' ORDER BY jbk.payment_date desc"
        var [resp] = await readConn.query(sql);
        if (resp) {
            return resp
        }
    }
    catch (err) {
        console.log("job bookkeeping list report service error: ", err);
        logger.error("job bookkeeping list report service error: ", err);
        return false;
    }
}