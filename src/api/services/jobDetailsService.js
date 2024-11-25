const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.jobDetails = async (data) => {
    try {
        if (data.job_id) {
            var resp = [];
            let sql = "SELECT j.job_number, j.job_details,j.job_type,DATE_FORMAT(j.job_startDate,'%d-%m-%y') as job_startDate,DATE_FORMAT(j.job_endDate,'%d-%m-%y') as job_endDate,j.equipments,j.external_employee,j.emp_id,j.products,j.cust_name,j.cust_phoneNo,j.cust_altPhoneNo,j.cust_email,j.cust_address,j.country_id,j.state_id,j.cust_city,j.cust_pin,j.event_location,j.total_amount,j.booking_amount,j.due_amount,s.state_name,c.country_name FROM jobs as j,country as c,state as s WHERE c.country_id = j.country_id AND s.state_id = j.state_id AND j.job_id = ? AND j.userId = ? AND j.userType = ? AND j.isDeleted = 0"
            var [resp] = await readConn.query(sql, [data.job_id, data.userId, data.userType]);
            let equipmentsSql = "SELECT inv_book_id,inv_id,job_id,job_number,booked_from FROM inventary_book WHERE job_id = ? AND userId = ? AND userType = ? AND bookingStatus = 1 AND isDeleted = 0"
            const [equipment] = await readConn.query(equipmentsSql, [data.job_id, data.userId, data.userType]);
            let employeesSql = "SELECT emp_book_id,emp_id,job_id,job_number,booked_from FROM employee_book WHERE job_id = ? AND userId = ? AND userType = ? AND bookingStatus = 1 AND isDeleted = 0"
            const [employee] = await readConn.query(employeesSql, [data.job_id, data.userId, data.userType]);
            resp.push(equipment);
            resp.push(employee);
        } else {
            let sql = "SELECT j.job_number, j.job_id,j.job_details,j.job_type,DATE_FORMAT(j.job_startDate,'%d-%m-%y') as job_startDate,DATE_FORMAT(j.job_endDate,'%d-%m-%y') as job_endDate,j.equipments,j.external_employee,j.emp_id,j.products,j.cust_name,j.cust_phoneNo,j.cust_altPhoneNo,j.cust_email,j.cust_address,j.country_id,j.state_id,j.cust_city,j.cust_pin,j.event_location,j.total_amount,j.booking_amount,j.due_amount,s.state_name,c.country_name FROM jobs as j,country as c,state as s WHERE c.country_id = j.country_id AND s.state_id = j.state_id AND j.job_number = ? AND j.userId = ? AND j.userType = ? AND j.isDeleted = 0"
            var [resp] = await readConn.query(sql, [data.job_number, data.userId, data.userType]);
            //resp.push(resp);
        }

        return resp;
    }
    catch (err) {
        console.log(err);
        logger.error(err);
        return false;
    }
}