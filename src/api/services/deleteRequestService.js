const writePool = require('../../config/mysql').writePool
const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.deleteRequest = async (data) => {
    try {
        const sql = `DELETE FROM request_for_booking WHERE req_date = '${data.req_date}' AND req_to = ${data.req_to} AND req_id = ${data.req_id} AND req_to_userType = ${data.req_to_userType} AND job_id = ${data.job_id} AND job_number = '${data.job_number}'`;
        const [resp] = await writePool.query(sql);
        return "Request deleted successfully";
    }
    catch (err) {
        console.log("err", err)
        logger.error(err);
        return false;
    }
}