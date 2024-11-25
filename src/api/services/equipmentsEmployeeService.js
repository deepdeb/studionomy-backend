const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getEquipmentEmployeeList = async (data) => {
    try {
        let mergedArray = [];

        let sqlEmployee = "SELECT eb.emp_book_id, DATE_FORMAT(eb.booked_from,'%Y-%m-%d') as booked_from,GROUP_CONCAT(DISTINCT e.empName) AS empNames,eb.emp_id FROM employee as e INNER JOIN employee_book AS eb ON FIND_IN_SET(e.emp_id, eb.emp_id) WHERE eb.userId = ? AND eb.userType = ? AND eb.job_id = ? AND eb.job_number = ? AND eb.isDeleted = 0 AND bookingStatus = 1 GROUP BY eb.emp_id, booked_from ORDER BY booked_from"
        const [resp] = await readConn.query(sqlEmployee, [data.userId, data.userType, data.job_id, data.job_number]);
        let sqlEquipment = "SELECT ib.inv_book_id, DATE_FORMAT(ib.booked_from,'%Y-%m-%d') as booked_from,GROUP_CONCAT(DISTINCT i.inv_code) AS inv_codes,ib.inv_id FROM inventary as i INNER JOIN inventary_book AS ib ON FIND_IN_SET(i.inv_id, ib.inv_id) WHERE ib.userId = ? AND ib.userType = ? AND ib.job_id = ? AND ib.job_number = ? AND ib.isDeleted = 0 AND bookingStatus = 1 GROUP BY ib.inv_id, booked_from ORDER BY booked_from"
        const [resp1] = await readConn.query(sqlEquipment, [data.userId, data.userType, data.job_id, data.job_number]);

        resp.forEach(empObj => {
            let matchingEquipment = resp1.find(eqObj => eqObj.booked_from === empObj.booked_from);
            if (matchingEquipment) {
                let mergedObj = {
                    booked_from: empObj.booked_from,
                    empBookId: empObj.emp_book_id,
                    empName: empObj.empNames,
                    emp_id: empObj.emp_id,
                    invBookId: matchingEquipment.inv_book_id,
                    inv_code: matchingEquipment.inv_codes,
                    inv_id: matchingEquipment.inv_id
                };
                mergedArray.push(mergedObj);
            }
        });

        return mergedArray;
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}