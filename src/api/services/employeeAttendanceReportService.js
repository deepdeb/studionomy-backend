const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");

exports.getEmployeeAttendanceListReport = async (data) => {
    try {
        let sql = "SELECT DATE_FORMAT(ea.empEntryTime,'%d-%m-%y') as empEntryTime,e.empName,e.empPhone,e.empEmail,e.empAddr,ea.emp_attendance,ea.emp_outdoor_hrs,ea.empRemarks FROM employee as e,employee_attendance as ea WHERE e.emp_id = ea.emp_id AND e.userId = ? AND e.userType = ? AND e.isDeleted = 0 AND ea.isDeleted = 0 AND ea.empEntryTime BETWEEN ? AND ?"
        var [resp] = await readConn.query(sql, [data.userId, data.userType, data.start_date, data.end_date]);
        if (resp) {
            return resp;
        }
    }
    catch (err) {
        console.log("employee attendance report service error: ", err);
        logger.error("employee attendance report service error: ", err);
        return false;
    }
}