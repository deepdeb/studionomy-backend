
const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");

exports.getEmployeeListReport = async (data) => {
    try {
        let sql = "SELECT empName,empPhone,empEmail,empAddr,DATE_FORMAT(empDateOfJoin,'%d-%m-%y') as empDateOfJoin FROM employee WHERE userId = ? AND userType = ? AND isDeleted = 0"
        var [resp] = await readConn.query(sql, [data.userId, data.userType]);

        if (resp) {
            return resp;
        }
    }
    catch (err) {
        console.log("employee list report service error: ", err);
        logger.info("employee list report service error: ", err);
        return false;
    }
}