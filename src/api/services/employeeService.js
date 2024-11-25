const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.employeeSubmit = async (data) => {
    try {
        if (data.emp_id == 0) {
            let sql = "INSERT INTO employee (userId,userType,empName,empPhone,empAltPhone,empEmail,empAddr,empDateOfJoin) VALUES(?,?,?,?,?,?,?,?)"
            const [resp] = await writePool.query(sql, [data.userId, data.userType, data.empName, data.empPhone, data.empAltPhone, data.empEmail, data.empAddr, data.empDateOfJoin]);
            return "Employee added successfully";
        } else {
            let sql = "UPDATE employee SET empName = ?,empPhone = ?,empAltPhone = ?,empEmail = ?,empAddr = ?,empDateOfJoin =? WHERE userId = ? AND userType = ? AND emp_id = ?"
            const [resp] = await writePool.query(sql, [data.empName, data.empPhone,data.empAltPhone, data.empEmail, data.empAddr, data.empDateOfJoin, data.userId, data.userType, data.emp_id]);
            return "Employee updated successfully";
        }
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}