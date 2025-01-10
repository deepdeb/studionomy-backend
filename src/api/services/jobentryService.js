const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
const { readPool } = require('../../config/mysql');
exports.jobentry = async (data) => {
    try {
        if (!data.job_id) {
            // let jobsUsedUpdateFromMainResp
            // let jobsUsedUpdateFromTopupResp

            // let jobsUsedCheckSql = "SELECT total_jobs - COALESCE(jobs_used, 0) as jobs_remaining FROM buy_subscription WHERE userId = ? AND userType = ? AND subs_type = ? AND isActive = ?"
            // const [jobsUsedCheckResp] = await readPool.query(jobsUsedCheckSql, [data.userId, data.userType, 0, 1]);

            // if(jobsUsedCheckResp[0].jobs_remaining > 0) {
            //     let jobsUsedUpdateFromMainSql = "UPDATE buy_subscription SET jobs_used = COALESCE(jobs_used, 0) + 1 WHERE userId = ? AND userType = ? AND subs_type = ? AND isActive = ?"
            //     jobsUsedUpdateFromMainResp = await writePool.query(jobsUsedUpdateFromMainSql, [data.userId, data.userType, 0, 1]);
            // }
            // else {
            //     let jobsUsedUpdateFromTopupSql = "UPDATE buy_subscription JOIN (SELECT buy_subs_id FROM buy_subscription WHERE total_jobs - COALESCE(jobs_used, 0) > 0 AND userId = ? AND userType = ? AND subs_type = ? AND isActive = ? ORDER BY buy_subs_id LIMIT 1) AS subquery ON buy_subscription.buy_subs_id = subquery.buy_subs_id SET buy_subscription.jobs_used = COALESCE(buy_subscription.jobs_used, 0) + 1"
            //     jobsUsedUpdateFromTopupResp = await writePool.query(jobsUsedUpdateFromTopupSql, [data.userId, data.userType, 1, 1]);
            // }

            // const mainRespAffectedRows = jobsUsedUpdateFromMainResp?.[0]?.affectedRows ?? 0;
            // const topupRespAffectedRows = jobsUsedUpdateFromTopupResp?.[0]?.affectedRows ?? 0;

            // if (mainRespAffectedRows > 0 || topupRespAffectedRows > 0 ) {
                let sql = "INSERT INTO jobs (userId,userType,job_number,job_details,job_type,job_startDate,job_endDate,equipments,emp_id,external_employee,products,cust_name,cust_phoneNo,cust_altPhoneNo,cust_email,cust_address,country_id,state_id,cust_city,event_location,total_amount,booking_amount,due_amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                const [resp] = await writePool.query(sql, [data.userId, data.userType, data.job_number, data.job_details, data.job_type, data.job_startDate, data.job_endDate, data.equipments, data.emp_id, data.external_employee, data.products, data.cust_name, data.cust_phoneNo, data.cust_altPhoneNo, data.cust_email, data.cust_address, data.country_id, data.state_id, data.cust_city, data.event_location, data.total_amount, data.booking_amount, data.due_amount]);
    
                let invStatusSql = "UPDATE inventary_book SET job_id = ?,bookingStatus = 1 WHERE userId = ? AND userType = ? AND job_number = ?"
                const [resp1] = await writePool.query(invStatusSql, [parseInt(resp.insertId), parseInt(data.userId), parseInt(data.userType), data.job_number]);
    
                let empStatusSql = "UPDATE employee_book SET job_id = ?,bookingStatus = 1 WHERE userId = ? AND userType = ? AND job_number = ?"
                const [resp2] = await writePool.query(empStatusSql, [parseInt(resp.insertId), parseInt(data.userId), parseInt(data.userType), data.job_number]);

                let quotationDeleteSql = "update quotations set is_Deleted = 1 where quotation_id = ?"
                const [quotaitonDeleteResp] = await writePool.query(quotationDeleteSql, [data.quotation_id]);
                
                //-----------------------------------------Job Book Keeping--------------------------------------------------------//
                let jobBookKeepingBookingAmountAndJobDetailsSql = "INSERT INTO job_book_keeping (userId, userType, job_id, job_number, job_value, payment_amount, payment_date, payment_description, payment_type, payment_status, profit, job_details) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
                await writePool.query(jobBookKeepingBookingAmountAndJobDetailsSql, [data.userId, data.userType, parseInt(resp.insertId), data.job_number, data.total_amount, data.booking_amount, new Date(), "booking amount", "Payment", "credit", data.booking_amount, data.job_details])
    
                return "Job submitted successfully";
            // }
            // else {
            //     return "You do not have jobs left. Please buy a topup.";
            // }
        } else {
            let invDeleteSql = "DELETE FROM inventary_book WHERE isDeleted = 1 AND bookingStatus = 0"
            const [resp3] = await writePool.query(invDeleteSql);

            let empDeleteSql = "DELETE FROM employee_book WHERE isDeleted = 1 AND bookingStatus = 0"
            const [resp4] = await writePool.query(empDeleteSql);

            let jobUpdateSql = "UPDATE jobs SET job_details = '" + data.job_details + "', job_type = '" + data.job_type + "', job_startDate = '" + data.job_startDate + "', job_endDate = '" + data.job_endDate + "', equipments = CASE WHEN equipments != '' AND equipments NOT LIKE '%" + data.equipments + "%' THEN CONCAT(equipments, ',', '" + data.equipments + "') WHEN equipments = '' THEN '" + data.equipments + "' ELSE equipments END, emp_id = CASE WHEN emp_id != '' AND emp_id NOT LIKE '%" + data.emp_id + "%' THEN CONCAT(emp_id, ',', '" + data.emp_id + "') WHEN emp_id = '' THEN '" + data.emp_id + "' ELSE emp_id END, external_employee = '" + data.external_employee + "', products = '" + data.products + "', cust_name = '" + data.cust_name + "', cust_phoneNo = '" + data.cust_phoneNo + "', cust_altPhoneNo = '" + data.cust_altPhoneNo + "', cust_email = '" + data.cust_email + "', cust_address = '" + data.cust_address + "', country_id = " + data.country_id + ", state_id = " + data.state_id + ", cust_city = '" + data.cust_city + "', event_location = '" + data.event_location + "', total_amount = '" + data.total_amount + "', booking_amount = '" + data.booking_amount + "', due_amount = '" + data.due_amount + "' WHERE userId = " + data.userId + " AND userType = " + data.userType + " AND job_id = " + data.job_id + " AND job_number = '" + data.job_number + "'"
            const [resp] = await writePool.query(jobUpdateSql);

            let invStatusSql = "UPDATE inventary_book SET job_id = ?, bookingStatus = 1, isDeleted = 0 WHERE userId = ? AND userType = ? AND job_number = ? AND inv_id = ?"
            const [resp1] = await writePool.query(invStatusSql, [parseInt(data.job_id), parseInt(data.userId), parseInt(data.userType), data.job_number, data.equipments]);

            let empStatusSql = "UPDATE employee_book SET job_id = ?, bookingStatus = 1, isDeleted = 0 WHERE userId = ? AND userType = ? AND job_number = ? AND emp_id = ?"
            const [resp2] = await writePool.query(empStatusSql, [parseInt(data.job_id), parseInt(data.userId), parseInt(data.userType), data.job_number, data.emp_id]);

            return "Job updated successfully"
        }

    }
    catch (err) {
        console.log(err)
        logger.error(err);
        return false;
    }
}
