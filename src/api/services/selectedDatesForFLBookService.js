const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getSelectedDatesForFLBook = async (data) => {
    try {
        let sql = "SELECT DATE_FORMAT(req_date, '%d-%m-%y') as req_date FROM request_for_booking WHERE req_to = ? AND job_id = ? AND job_number = ?"
        const [resp] = await readConn.query(sql, [data.req_to, data.job_id, data.job_number]);
        return resp ? resp : [];
    }
    catch (err) {
        console.log("selected dates for fl book service error: ", err);
        logger.error(err);
        return false;
    }
}