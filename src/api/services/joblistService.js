const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getJobList = async (data) => {
    try {
        var today = new Date().toISOString().split('T')[0] + ' 00:00:00';
        var searchCondition = "";
        if (data.job_search_criteria) {
            searchCondition += " AND (j.job_number LIKE '%" + data.job_search_criteria + "%' OR j.cust_name LIKE '%" + data.job_search_criteria + "%' OR j.cust_phoneNo LIKE '%" + data.job_search_criteria + "%' OR j.job_details LIKE '%" + data.job_search_criteria + "%' OR j.job_type LIKE '%" + data.job_search_criteria + "%' OR j.event_location LIKE '%" + data.job_search_criteria + "%')"
        }
        if (data.limit && data.jobType == 'upcoming') {
            let sql = "SELECT j.job_id, j.emp_id, j.external_employee, j.job_number, j.job_details, j.job_type, DATE_FORMAT(j.job_startDate, '%d-%m-%y') as job_startDate, DATE_FORMAT(j.job_endDate, '%d-%m-%y') as job_endDate, j.products, j.cust_name, j.cust_phoneNo, j.cust_altPhoneNo, j.cust_email, j.cust_address, j.event_location, j.total_amount, j.booking_amount, COALESCE(jpd.payment_amount, 0) as payment_amount, (j.total_amount - j.booking_amount - COALESCE(jpd.payment_amount, 0)) as due_amount, COALESCE(jpd.payment_amount + j.booking_amount, j.booking_amount) as total_paid_amount, COALESCE((SELECT payment_amount FROM job_payment_details AS jpdls WHERE jpdls.job_id = j.job_id AND jpdls.isDeleted = 0 ORDER BY payment_date DESC LIMIT 1), j.booking_amount) as last_paid_amount, COALESCE((SELECT DATE_FORMAT(payment_date, '%d-%m-%y') as payment_date FROM job_payment_details AS jp WHERE jp.job_id = j.job_id AND jp.isDeleted = 0 ORDER BY payment_date DESC LIMIT 1), DATE_FORMAT(j.created_at, '%d-%m-%y')) as last_payment_date, (SELECT GROUP_CONCAT(DISTINCT i.inv_code) FROM inventary AS i WHERE FIND_IN_SET(i.inv_id, j.equipments) > 0) as equipments, (SELECT GROUP_CONCAT(DISTINCT e.empName) FROM employee AS e WHERE FIND_IN_SET(e.emp_id, j.emp_id) > 0) as empName FROM jobs as j LEFT JOIN (SELECT job_id, SUM(payment_amount) as payment_amount FROM job_payment_details WHERE isDeleted = 0 GROUP BY job_id) as jpd ON jpd.job_id = j.job_id WHERE j.userId = ? AND j.userType = ? AND j.isCancel = 0 AND j.isDeleted = 0 AND j.job_startDate >= '" + today + "' " + searchCondition + " ORDER BY j.job_id DESC LIMIT ? OFFSET ?"
            var [resp] = await readConn.query(sql, [data.userId, data.userType, data.limit, data.offset]);
            var countSql = "SELECT COUNT(j.job_id) as totalCount FROM jobs as j WHERE j.userId = " + data.userId + " AND j.userType = " + data.userType + " AND j.isDeleted = 0 AND j.isCancel = 0 AND j.job_startDate >= '" + today + "' " + searchCondition + ""
            var [respCount] = await readConn.query(countSql);
        }
        else if (data.limit && data.jobType == 'past') {
            console.log('enter')
            let sql = "SELECT j.job_id,j.emp_id,j.external_employee,j.job_number,j.job_details,j.job_type,DATE_FORMAT(j.job_startDate,'%d-%m-%y')as job_startDate,DATE_FORMAT(j.job_endDate,'%d-%m-%y')as job_endDate,j.products,j.cust_name,j.cust_phoneNo,j.cust_altPhoneNo,j.cust_email,j.cust_address,j.event_location,j.total_amount,j.booking_amount,GROUP_CONCAT(DISTINCT i.inv_code) as equipments,GROUP_CONCAT(DISTINCT e.empName) as empName,COALESCE(jpd.payment_amount, 0) as payment_amount,(j.total_amount - j.booking_amount - COALESCE(jpd.payment_amount, 0)) as due_amount,COALESCE(payment_amount + booking_amount,booking_amount) as total_paid_amount,COALESCE((SELECT payment_amount FROM job_payment_details as jpdls WHERE jpdls.job_id = j.job_id AND jpdls.isDeleted =0 ORDER BY payment_date DESC LIMIT 1),booking_amount) as last_paid_amount,COALESCE((SELECT DATE_FORMAT(payment_date,'%d-%m-%y') as payment_date FROM job_payment_details as jp WHERE jp.job_id = j.job_id AND jp.isDeleted =0 ORDER BY payment_date DESC LIMIT 1),DATE_FORMAT(j.created_at,'%d-%m-%y')) as last_payment_date FROM jobs as j LEFT JOIN inventary as i ON FIND_IN_SET(i.inv_id, j.equipments) > 0 LEFT JOIN employee as e ON FIND_IN_SET(e.emp_id, j.emp_id) > 0 LEFT JOIN (SELECT job_id,SUM(payment_amount) as payment_amount FROM job_payment_details WHERE isDeleted = 0 GROUP BY job_id) as jpd ON jpd.job_id = j.job_id WHERE j.userId = ? AND j.userType = ? AND j.isCancel = 0 AND j.isDeleted = 0 AND j.job_startDate < '" + today + "' " + searchCondition + " GROUP BY j.job_id ORDER BY j.job_id DESC LIMIT ? OFFSET ?"
            var [resp] = await readConn.query(sql, [data.userId, data.userType, data.limit, data.offset]);
            var countSql = "SELECT COUNT(j.job_id) as totalCount FROM jobs as j WHERE j.userId = " + data.userId + " AND j.userType = " + data.userType + " AND j.isDeleted = 0 AND j.isCancel = 0 AND j.job_startDate < '" + today + "' " + searchCondition + ""
            var [respCount] = await readConn.query(countSql);
        }
        else if (data.limit && data.jobType == 'closed') {
            var resp = [];
            var respCount = [{totalCount : 0}];
        } else {
            let sql = "SELECT j.job_id,j.job_number,j.emp_id,j.external_employee,j.job_details,j.job_type,DATE_FORMAT(j.job_startDate,'%Y-%m-%d')as job_startDate,DATE_FORMAT(j.job_endDate,'%Y-%m-%d')as job_endDate,j.products,j.cust_name,j.cust_phoneNo,j.cust_altPhoneNo,j.cust_email,j.cust_address,j.event_location,j.total_amount,j.booking_amount,GROUP_CONCAT(DISTINCT i.inv_code) as equipments,GROUP_CONCAT(DISTINCT e.empName) as empName,COALESCE(jpd.payment_amount, 0) as payment_amount,(j.total_amount - j.booking_amount - COALESCE(jpd.payment_amount, 0)) as due_amount,COALESCE(payment_amount + booking_amount,booking_amount) as total_paid_amount,COALESCE((SELECT payment_amount FROM job_payment_details as jpdls WHERE jpdls.job_id = j.job_id AND jpdls.isDeleted =0 ORDER BY payment_date DESC LIMIT 1),booking_amount) as last_paid_amount,COALESCE((SELECT DATE_FORMAT(payment_date,'%d-%m-%y') as payment_date FROM job_payment_details as jp WHERE jp.job_id = j.job_id AND jp.isDeleted =0 ORDER BY payment_date DESC LIMIT 1),DATE_FORMAT(j.created_at,'%d-%m-%y')) as last_payment_date FROM jobs as j LEFT JOIN inventary as i ON FIND_IN_SET(i.inv_id, j.equipments) > 0 LEFT JOIN employee as e ON FIND_IN_SET(e.emp_id, j.emp_id) > 0 LEFT JOIN (SELECT job_id,SUM(payment_amount) as payment_amount FROM job_payment_details WHERE isDeleted = 0 GROUP BY job_id) as jpd ON jpd.job_id = j.job_id WHERE j.userId = ? AND j.userType = ? AND j.isCancel = 0 AND j.isDeleted = 0 " + searchCondition + " GROUP BY j.job_id ORDER BY j.job_id DESC"
            var [resp] = await readConn.query(sql, [data.userId, data.userType]);
            var countSql = "SELECT COUNT(j.job_id) as totalCount FROM jobs as j WHERE j.userId = " + data.userId + " AND j.userType = " + data.userType + " AND j.isDeleted = 0 AND j.isCancel = 0 " + searchCondition + ""
            var [respCount] = await readConn.query(countSql);
        }
        let resp2 = []
        resp2.push(respCount ? respCount[0].totalCount : 0);
        resp2.push(resp ? resp : []);
        return resp2 ? resp2 : [];
    }
    catch (err) {
        console.log('Error:', err)
        logger.error(err);
        return false;
    }
}