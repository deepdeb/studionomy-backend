const writePool = require('../../config/mysql').writePool
const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.sendRequest = async (data) => {
    try {
        if (!data.req_id) {
            let isBookedDates = [];
            for (let date of data.selectedDates) {
                const sameDayReqCheckSql = "SELECT * from request_for_booking WHERE req_to = ? AND req_date = ? AND (req_from = ? OR req_status = 'accepted')"
                const [resp] = await readPool.query(sameDayReqCheckSql, [data.req_to, date, data.req_from]);
                if(resp.length > 0)
                    {   
                        isBookedDates.push(date)
                    }
            }
            if (isBookedDates.length === 0) {
                for (let date of data.selectedDates) {
                    let sql = "INSERT INTO request_for_booking(req_from,req_from_userType,req_to,req_to_userType,req_date,job_id,job_number,event_location,payment,skills,message) VALUES(?,?,?,?,?,?,?,?,?,?,?)"
                    const [resp] = await writePool.query(sql, [data.req_from, data.req_from_userType, data.req_to, data.req_to_userType, date, data.job_id, data.job_number, data.event_location, data.payment, data.skills, data.message]);
                }
                return "Request sent successfully";
            }
            else {
                return `Freelancer already booked on ${isBookedDates.join(', ')}`
            }
        }
        else {
            let sql = "UPDATE request_for_booking SET req_from = ?,req_from_userType = ?,req_to = ?,req_to_userType = ?,job_id = ?,job_number = ?,event_location = ?,payment = ?,skills =?,message = ? WHERE req_from = ? AND req_from_userType = ? AND req_id = ?"
            const [resp] = await writePool.query(sql, [data.req_from, data.req_from_userType, data.req_to, data.req_to_userType, data.job_id, data.job_number, data.event_location, data.payment, data.skills, data.message, data.req_from, data.req_from_userType, data.req_id]);
            return "Request updated successfully";
        }
    }
    catch (err) {
        console.log("err", err)
        logger.error(err);
        return false;
    }
}