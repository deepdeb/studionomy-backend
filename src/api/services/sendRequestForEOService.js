const writePool = require('../../config/mysql').writePool
const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.sendRequestForEO = async (data) => {
    try {
        if (!data.req_id) {
            for (let i = 0; i < data.equipment_booking_details.length; i++) {
                let sql = "INSERT INTO request_for_booking(req_from,req_from_userType,req_to,req_to_userType,req_date,job_id,job_number,event_location,payment,equipment_id,message) VALUES(?,?,?,?,?,?,?,?,?,?,?)"
                const [resp] = await writePool.query(sql, [data.req_from, data.req_from_userType, data.req_to, data.req_to_userType, data.equipment_booking_details[i].booked_from, data.job_id, data.job_number, data.event_location, data.payment, data.equipment_booking_details[i].equipments_id, data.message]);
            }
            return "Request sent successfully";
        }
        else {
            for (let i = 0; i < data.equipment_booking_details.length; i++) {
                let sql = "UPDATE request_for_booking SET req_from = ?,req_from_userType = ?,req_to = ?,req_to_userType = ?,req_date = ?, job_id = ?,job_number = ?,event_location = ?,payment = ?,equipment_id =?,message = ? WHERE req_from = ? AND req_from_userType = ? AND req_id = ?"
                const [resp] = await writePool.query(sql, [data.req_from, data.req_from_userType, data.req_to, data.req_to_userType, data.equipment_booking_details[i].booked_from, data.job_id, data.job_number, data.event_location, data.payment, data.equipment_booking_details[i].equipments_id, data.message, data.req_from, data.req_from_userType, data.req_id]);
            }
            return "Request updated successfully";
        }
    }
    catch (err) {
        console.log("send request for EO service error: ", err)
        logger.error("send request for EO service error: ", err);
        return false;
    }
}