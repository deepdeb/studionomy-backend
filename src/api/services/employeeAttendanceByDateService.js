const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getemployeeAttendanceByDate = async (data) => {
    try {
        let sql = "SELECT ea.empAttn_id,ea.emp_id,ea.empEntryTime,ea.empExitTime,ea.emp_attendance,ea.emp_outdoor_hrs,ea.empRemarks from employee_attendance ea where ea.userId = ? AND ea.userType = ? AND ea.empEntryTime = ? AND ea.emp_id = ?"
        const [resp] = await readConn.query(sql, [data.userId, data.userType, data.attnDate, data.emp_id]);
        return resp
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}