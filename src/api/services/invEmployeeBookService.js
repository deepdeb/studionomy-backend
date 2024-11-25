const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.invEmployeeBook = async (data) => {
    try {
        const messages = [];

        if(data.equipments) {
            const checkInvBookingSql = "SELECT * FROM inventary_book WHERE inv_id = ? AND booked_from = ? AND job_id = ? AND job_number = ? AND userId = ? AND userType = ?";
            const [existingInvBooking] = await writePool.query(checkInvBookingSql, [data.equipments, data.bookingDate, data.job_id, data.job_number, data.userId, data.userType]);

            if(existingInvBooking.length === 0) {
                let invStatusSql = "INSERT INTO inventary_book(inv_id,job_number,userId,userType,booked_from,booked_to,bookingStatus) VALUES(?,?,?,?,?,?,?)"
                const [resp] = await writePool.query(invStatusSql, [data.equipments, data.job_number, parseInt(data.userId), parseInt(data.userType), data.bookingDate, data.bookingDate, 1]);
                messages.push("Inventary booked successfully");
            } else {
                invStatusSql = "UPDATE inventary_book SET isDeleted = 0 WHERE inv_id = ? AND booked_from = ? AND job_id = ? AND job_number = ? AND userId = ? AND userType = ?";
                const [resp] = await writePool.query(invStatusSql, [data.equipments, data.bookingDate, data.job_id, data.job_number, data.userId, data.userType]);
            }

        }

        if(data.employees) {
            const checkEmpBookingSql = "SELECT * FROM employee_book WHERE emp_id = ? AND booked_from = ? AND job_id = ? AND job_number = ? AND userId = ? AND userType = ?";
            const [existingEmpBooking] = await writePool.query(checkEmpBookingSql, [data.employees, data.bookingDate, data.job_id, data.job_number, data.userId, data.userType]);

            if(existingEmpBooking.length == 0) {
                let empStatusSql = "INSERT INTO employee_book(emp_id,job_number,userId,userType,booked_from,booked_to,bookingStatus) VALUES(?,?,?,?,?,?,?)"
                const [resp] = await writePool.query(empStatusSql, [data.employees, data.job_number, parseInt(data.userId), parseInt(data.userType), data.bookingDate, data.bookingDate, 1]);
                messages.push("Employee booked successfully");
            } else {
                empStatusSql = "UPDATE employee_book SET isDeleted = 0 WHERE emp_id = ? AND booked_from = ? AND job_id = ? AND job_number = ? AND userId = ? AND userType = ?";
                const [resp] = await writePool.query(empStatusSql, [data.employees, data.bookingDate, data.job_id, data.job_number, data.userId, data.userType]);
            }

        }
        return messages;
    }
    catch (err) {
        console.log(err)
        logger.error(err);
        return false;
    }
}
