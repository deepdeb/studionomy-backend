const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");

exports.getJobListReport = async (data) => {
    try {
        let sql = "SELECT j.job_id, j.emp_id, j.external_employee, j.job_number, j.job_details, DATE_FORMAT(j.job_startDate, '%d-%m-%y') as job_startDate, DATE_FORMAT(j.job_endDate, '%d-%m-%y') as job_endDate, j.products, j.cust_name, j.cust_phoneNo, j.cust_altPhoneNo, j.cust_email, j.cust_address, j.event_location, j.total_amount, j.booking_amount, COALESCE(jpd.payment_amount, 0) as payment_amount, (j.total_amount - j.booking_amount - COALESCE(jpd.payment_amount, 0)) as due_amount, COALESCE(jpd.payment_amount + j.booking_amount, j.booking_amount) as total_paid_amount, COALESCE((SELECT payment_amount FROM job_payment_details AS jpdls WHERE jpdls.job_id = j.job_id AND jpdls.isDeleted = 0 ORDER BY payment_date DESC LIMIT 1), j.booking_amount) as last_paid_amount, COALESCE((SELECT DATE_FORMAT(payment_date, '%d-%m-%y') as payment_date FROM job_payment_details AS jp WHERE jp.job_id = j.job_id AND jp.isDeleted = 0 ORDER BY payment_date DESC LIMIT 1), DATE_FORMAT(j.created_at, '%d-%m-%y')) as last_payment_date, (SELECT GROUP_CONCAT(DISTINCT i.inv_code) FROM inventary AS i WHERE FIND_IN_SET(i.inv_id, j.equipments) > 0) as equipments, (SELECT GROUP_CONCAT(DISTINCT e.empName) FROM employee AS e WHERE FIND_IN_SET(e.emp_id, j.emp_id) > 0) as empName FROM jobs as j LEFT JOIN (SELECT job_id, SUM(payment_amount) as payment_amount FROM job_payment_details WHERE isDeleted = 0 GROUP BY job_id) as jpd ON jpd.job_id = j.job_id WHERE j.userId = ? AND j.userType = ? AND j.isCancel = 0 AND j.isDeleted = 0 AND j.job_startDate >= ? AND j.job_endDate <= ?"
        var [resp] = await readConn.query(sql, [data.userId, data.userType, data.start_date, data.end_date]);

        return resp
    }
    catch (err) {
        console.log("job list report service error: ", err);
        logger.error("job list report service error: ", err);
        return false;
    }
}