const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getSelectedEquipmentsForEOBook = async (data) => {
    try {
        console.log('req_date>>>>>', data.req_date);
        let sql = "SELECT DATE_FORMAT(rb.req_date, '%Y-%m-%d') as req_date, rb.equipment_id, i.inv_code FROM request_for_booking rb JOIN inventary i ON i.inv_id = rb.equipment_id WHERE rb.req_to = ? AND rb.job_id = ? AND rb.job_number = ? AND rb.req_date = ? AND rb.req_id = ?"
        const [resp] = await readConn.query(sql, [data.req_to, data.job_id, data.job_number, data.req_date, data.req_id]);
        return resp ? resp : [];
    }
    catch (err) {
        console.log("selected equipments for eo book service error: ", err);
        logger.error("selected equipments for eo book service error:", err);
        return false;
    }
}