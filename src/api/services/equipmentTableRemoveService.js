const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.equipmentTableRemove = async (data) => {
    try {

        if (data.itemType === "employee") {
            const empRemoveSql = "UPDATE employee_book SET isDeleted = 1, bookingStatus = 0 WHERE userId = '" + data.userId + "' AND userType = '" + data.userType + "' AND job_id = '" + data.job_id + "' AND job_number = '" + data.job_number + "' AND booked_from = '" + data.bookingDate + "' AND emp_id = '" + data.emp_id + "'"
            const [resp] = await readConn.query(empRemoveSql);

            const empRemoveFromJobSql = "UPDATE jobs AS j JOIN employee_book AS e SET j.emp_id = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', j.emp_id, ','), CONCAT(',', '" + data.emp_id + "', ','), ',')) WHERE j.emp_id LIKE '%" + data.emp_id + "%' AND j.userId = " + data.userId + " AND j.userType = " + data.userType + " AND j.job_id = " + data.job_id + " AND j.job_number = '" + data.job_number + "' AND e.booked_from = '" + data.bookingDate + "'"
            const [resp2] = await readConn.query(empRemoveFromJobSql);

            return "Employee deleted successfully"
        } else if (data.itemType === "equipment") {
            const equipRemoveSql = "UPDATE inventary_book SET isDeleted = 1, bookingStatus = 0 WHERE userId = '" + data.userId + "' AND userType = '" + data.userType + "' AND job_id = '" + data.job_id + "' AND job_number = '" + data.job_number + "' AND booked_from = '" + data.bookingDate + "' AND inv_id = '" + data.inv_id + "'"
            const [resp] = await readConn.query(equipRemoveSql);

            const eqRemoveFromJobSql = "UPDATE jobs AS j JOIN inventary_book AS i SET j.equipments = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', j.equipments, ','), CONCAT(',', '" + data.inv_id + "', ','), ',')) WHERE j.equipments LIKE '%" + data.inv_id + "%' AND j.userId = " + data.userId + " AND j.userType = " + data.userType + " AND j.job_id = " + data.job_id + " AND j.job_number = '" + data.job_number + "' AND i.booked_from = '" + data.bookingDate + "'"
            const [resp2] = await readConn.query(eqRemoveFromJobSql);

            return "Equipment deleted successfully"
        } else {
            const equipRemoveSql = "UPDATE inventary_book SET isDeleted = 1, bookingStatus = 0 WHERE userId = '" + data.userId + "' AND userType = '" + data.userType + "' AND job_id = '" + data.job_id + "' AND job_number = '" + data.job_number + "' AND booked_from = '" + data.bookingDate + "' AND inv_id = '" + data.inv_id + "'"
            const [resp] = await readConn.query(equipRemoveSql);

            const empRemoveSql = "UPDATE employee_book SET isDeleted = 1, bookingStatus = 0 WHERE userId = '" + data.userId + "' AND userType = '" + data.userType + "' AND job_id = '" + data.job_id + "' AND job_number = '" + data.job_number + "' AND booked_from = '" + data.bookingDate + "' AND emp_id = '" + data.emp_id + "'"
            const [resp2] = await readConn.query(empRemoveSql);

            const eqRemoveFromJobSql = "UPDATE jobs AS j JOIN inventary_book AS i SET j.equipments = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', j.equipments, ','), CONCAT(',', '" + data.inv_id + "', ','), ',')) WHERE j.equipments LIKE '%" + data.inv_id + "%' AND j.userId = " + data.userId + " AND j.userType = " + data.userType + " AND j.job_id = " + data.job_id + " AND j.job_number = '" + data.job_number + "' AND i.booked_from = '" + data.bookingDate + "'"
            const [resp3] = await readConn.query(eqRemoveFromJobSql);

            const empRemoveFromJobSql = "UPDATE jobs AS j JOIN employee_book AS e SET j.emp_id = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', j.emp_id, ','), CONCAT(',', '" + data.emp_id + "', ','), ',')) WHERE j.emp_id LIKE '%" + data.emp_id + "%' AND j.userId = " + data.userId + " AND j.userType = " + data.userType + " AND j.job_id = " + data.job_id + " AND j.job_number = '" + data.job_number + "' AND e.booked_from = '" + data.bookingDate + "'"
            const [resp4] = await readConn.query(empRemoveFromJobSql);

            // console.log(empRemoveFromJobSql);
            // console.log(eqRemoveFromJobSql);

            return "Entry deleted successfully"
        }
    }
    catch (err) {
        console.log(err)
        logger.error(err);
        return false;
    }
}