const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getQuotationList = async (data) => {
    try {
        var today = new Date().toISOString().split('T')[0] + ' 00:00:00';
        var searchCondition = "";
        if (data.quote_search_criteria) {
            searchCondition += " AND (q.quotation_number LIKE '%" + data.quote_search_criteria + "%' OR q.cust_firstName LIKE '%" + data.quote_search_criteria + "%' OR q.cust_lastName LIKE '%" + data.quote_search_criteria + "%' OR q.event_location LIKE '%" + data.quote_search_criteria + "%' OR q.cust_phoneNo LIKE '%" + data.quote_search_criteria + "%')"
        }
        if (data.limit && data.quotationType == 'upcoming') {
            let sql = "SELECT q.quotation_id, q.job_details, q.quotation_number, DATE_FORMAT(q.job_startDate, '%d-%m-%y') as job_startDate, DATE_FORMAT(q.job_endDate, '%d-%m-%y') as job_endDate, q.cust_firstName, q.cust_lastName, q.cust_phoneNo, q.cust_altPhoneNo, q.cust_email, q.address, q.event_location, q.total_amount, GROUP_CONCAT(DATE_FORMAT(qb.bookingDate, '%d-%m-%y')) AS bookingDate, GROUP_CONCAT(qb.specialization) AS specialization, GROUP_CONCAT(qb.crew) AS crew FROM quotations q LEFT JOIN quotation_book qb ON q.quotation_id = qb.quotation_id WHERE q.userId = ? AND q.userType = ? AND q.isDeleted = 0 AND q.job_startDate >= '" + today + "' " + searchCondition + " GROUP BY q.quotation_id ORDER BY q.quotation_id DESC LIMIT ? OFFSET ?"
            var [resp] = await readConn.query(sql, [data.userId, data.userType, data.limit, data.offset]);
            var countSql = "SELECT COUNT(q.quotation_id) as totalCount FROM quotations as q WHERE q.userId = " + data.userId + " AND q.userType = " + data.userType + " AND q.isDeleted = 0 AND q.job_startDate >= '" + today + "' " + searchCondition + ""
            var [respCount] = await readConn.query(countSql);
        }
        else if (data.limit && data.quotationType == 'past') {
            let sql = "SELECT q.quotation_id, q.job_details, q.quotation_number, DATE_FORMAT(q.job_startDate, '%d-%m-%y') as job_startDate, DATE_FORMAT(q.job_endDate, '%d-%m-%y') as job_endDate, q.cust_firstName, q.cust_lastName, q.cust_phoneNo, q.cust_altPhoneNo, q.cust_email, q.address, q.event_location, q.total_amount, GROUP_CONCAT(DATE_FORMAT(qb.bookingDate, '%d-%m-%y')) AS bookingDate, GROUP_CONCAT(qb.specialization) AS specialization, GROUP_CONCAT(qb.crew) AS crew FROM quotations q LEFT JOIN quotation_book qb ON q.quotation_id = qb.quotation_id WHERE q.userId = ? AND q.userType = ? AND q.isDeleted = 0 AND q.job_startDate < '" + today + "' " + searchCondition + " GROUP BY q.quotation_id ORDER BY q.quotation_id DESC LIMIT ? OFFSET ?"
            var [resp] = await readConn.query(sql, [data.userId, data.userType, data.limit, data.offset]);
            var countSql = "SELECT COUNT(q.quotation_id) as totalCount FROM quotations as q WHERE q.userId = " + data.userId + " AND q.userType = " + data.userType + " AND q.isDeleted = 0 AND q.job_startDate < '" + today + "' " + searchCondition + ""
            var [respCount] = await readConn.query(countSql);
        }
        else if (data.limit && data.quotationType == 'closed') {
            var resp = []
            var respCount = [{totalCount : 0}]
        }
        else {
            let sql = "SELECT q.quotation_id, q.job_details, q.quotation_number, DATE_FORMAT(q.job_startDate, '%d-%m-%y') as job_startDate, DATE_FORMAT(q.job_endDate, '%d-%m-%y') as job_endDate, q.cust_firstName, q.cust_lastName, q.cust_phoneNo, q.cust_altPhoneNo, q.cust_email, q.address, q.event_location, q.total_amount, GROUP_CONCAT(DATE_FORMAT(qb.bookingDate, '%d-%m-%y')) AS bookingDate, GROUP_CONCAT(qb.specialization) AS specialization, GROUP_CONCAT(qb.crew) AS crew FROM quotations q LEFT JOIN quotation_book qb ON q.quotation_id = qb.quotation_id WHERE q.userId = ? AND q.userType = ? AND q.isDeleted = 0" + searchCondition + " GROUP BY q.quotation_id"
            var [resp] = await readConn.query(sql, [data.userId, data.userType]);
            var countSql = "SELECT COUNT(q.quotation_id) as totalCount FROM quotations as q WHERE q.userId = " + data.userId + " AND q.userType = " + data.userType + " AND q.isDeleted = 0" + searchCondition + ""
            var [respCount] = await readConn.query(countSql);
        }
        let resp2 = []
        resp2.push(respCount ? respCount[0].totalCount : 0);
        resp2.push(resp ? resp : []);
        return resp2 ? resp2 : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}