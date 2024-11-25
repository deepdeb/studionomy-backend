const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
const { readPool } = require('../../config/mysql');
exports.employeeAttendanceSubmit = async (data) => {
    try {
        var empAttnArrar = [];
        empAttnArrar = data.empAttnArrar;

        if (data.empAttn_id == 0) {
            let empNames = "";
            let c = 0;
            for (let i = 0; i < empAttnArrar.length; i++) {
                let sql1 = "SELECT COUNT(empAttn_id) as count FROM employee_attendance WHERE isDeleted = 0 AND emp_id = " + empAttnArrar[i].emp_id + " AND  userId = " + data.userId + " AND userType = " + data.userType + " AND empEntryTime = '" + data.attnDate + "' AND emp_attendance != ''"
                const [resp1] = await readPool.query(sql1);

                if (resp1[0].count == 0 && empAttnArrar[i].emp_attendance != '') {
                    let sql = "INSERT INTO employee_attendance(emp_id,userId,userType,empEntryTime,emp_attendance,emp_outdoor_hrs,empRemarks) VALUES(?,?,?,?,?,?,?)"
                    var [resp] = await writePool.query(sql, [empAttnArrar[i].emp_id, data.userId, data.userType, data.attnDate, empAttnArrar[i].emp_attendance, empAttnArrar[i].emp_outdoor_hrs, empAttnArrar[i].empRemarks]);
                }
                if (resp1[0].count > 0 && empAttnArrar[i].emp_attendance != '') {
                    c++;
                    let sql4 = "SELECT empName FROM employee WHERE isDeleted = 0 AND userId = " + data.userId + " AND userType = " + data.userType + " AND emp_id = " + empAttnArrar[i].emp_id + ""

                    const [resp4] = await readPool.query(sql4);
                    empNames = empNames ? empNames + "," + resp4[0].empName : resp4[0].empName;
                }
            }
            if (c == empAttnArrar.length) {
                return "You have already submitted attendance";
            }
            else if (empNames) {
                return " " + empNames + " have already entered attendance and other employees attendance submitted successfully";
            } else {
                return "Employee Attendance submitted successfully";
            }

        } else if (data.emp_id) {
            let sql = "UPDATE employee_attendance SET emp_attendance = ?,emp_outdoor_hrs = ?,empRemarks = ? WHERE userId = " + data.userId + " AND userType = " + data.userType + " AND empEntryTime = '" + data.attnDate + "' AND emp_id = " + data.emp_id + ""
            var [resp] = await writePool.query(sql, [data.empAttendance, data.empOutdoorHours, data.empRemarks]);
            return "Employee Attendance updated successfully";
        }
    }
    catch (err) {
        console.log("err>>>>>>>>", err);
        logger.error(err);
        return false;
    }
}