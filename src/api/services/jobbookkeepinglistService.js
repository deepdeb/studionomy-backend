const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getAllJobBookkeepingList = async (data) => {
    try {
        let searchCondition = '';
        if(data.payment_criteria) {
            searchCondition += " AND (jbk.job_number LIKE '%" + data.payment_criteria + "%' OR j.cust_phoneNo LIKE '%" + data.payment_criteria + "%')"
        }
        if (data.startDate && data.endDate) {
            let sql = "SELECT jbk.jb_id,jbk.payment_date,jbk.job_id,jbk.job_number,jbk.job_value,jbk.job_details,jbk.payment_description,jbk.payment_amount,jbk.payment_type,jbk.payment_status,jbk.profit,j.cust_phoneNo FROM job_book_keeping jbk LEFT JOIN jobs j ON jbk.userId = j.userId WHERE jbk.isDeleted = 0 AND jbk.userId = " + data.userId + " AND jbk.userType = " + data.userType + " AND jbk.job_number = j.job_number AND jbk.job_id = j.job_id AND jbk.payment_date BETWEEN '" + data.startDate + "' AND '" + data.endDate + "'" + searchCondition + " ORDER BY jbk.payment_date desc LIMIT ? OFFSET ?"
            var [resp] = await readPool.query(sql, [data.limit, data.offset]);
            
            let countSql = "SELECT COUNT(jbk.jb_id) as totalCount FROM job_book_keeping jbk LEFT JOIN jobs j ON jbk.userId = j.userId WHERE jbk.isDeleted = 0 AND jbk.userId = " + data.userId + " AND jbk.userType = " + data.userType + " AND jbk.job_number = j.job_number AND jbk.job_id = j.job_id AND jbk.payment_date BETWEEN '" + data.startDate + "' AND '" + data.endDate + "'" + searchCondition + " ORDER BY jbk.payment_date desc LIMIT ? OFFSET ?"
            var [countresp] = await readPool.query(countSql, [data.limit, data.offset]);
        }
        else {
            let sql = "SELECT jbk.jb_id,jbk.payment_date,jbk.job_id,jbk.job_number,jbk.job_value,jbk.job_details,jbk.payment_description,jbk.payment_amount,jbk.payment_type,jbk.payment_status,jbk.profit,j.cust_phoneNo FROM job_book_keeping jbk LEFT JOIN jobs j ON jbk.userId = j.userId WHERE jbk.isDeleted = 0 AND jbk.userId = " + data.userId + " AND jbk.userType = " + data.userType +  " AND jbk.job_number = j.job_number AND jbk.job_id = j.job_id" + searchCondition + " ORDER BY jbk.payment_date desc LIMIT ? OFFSET ?"
            var [resp] = await readPool.query(sql, [data.limit, data.offset]);

            let countSql = "SELECT COUNT(jb_id) as totalCount FROM job_book_keeping jbk LEFT JOIN jobs j ON jbk.userId = j.userId WHERE jbk.isDeleted = 0 AND jbk.userId = " + data.userId + " AND jbk.userType = " + data.userType +  " AND jbk.job_number = j.job_number AND jbk.job_id = j.job_id" + searchCondition + " ORDER BY jbk.payment_date desc LIMIT ? OFFSET ?"
            var [countresp] = await readPool.query(countSql, [data.limit, data.offset]);
        }

        var resp2 = [];
        resp2.push(countresp[0].totalCount);
        resp2.push(resp);
        return resp2;
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}