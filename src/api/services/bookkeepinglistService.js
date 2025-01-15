const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getAllBookkeepingList = async (data) => {
    try {
        let searchCondition = "";
        if(data.searchCriteria) {
            searchCondition += " AND (debit_mode LIKE '%" + data.searchCriteria + "%' OR b_description LIKE '%" + data.searchCriteria + "%' OR credit_mode LIKE '%" + data.searchCriteria + "%' OR remarks LIKE '%" + data.searchCriteria + "%' OR credit_amount LIKE '%" + data.searchCriteria + "%' OR debit_amount LIKE '%" + data.searchCriteria + "%' OR closing_balance LIKE '%" + data.searchCriteria + "%')"
        }
        if (data.startDate && data.endDate) {
            let sql = "SELECT b_id,book_date,b_description,CAST(debit_amount AS FLOAT) AS debit_amount,debit_mode,CAST(credit_amount AS FLOAT) AS credit_amount,credit_mode,CAST(closing_balance AS FLOAT) AS closing_balance,CAST(closing_balance AS FLOAT) AS actual_opening_balance,COALESCE(LAG(CAST(closing_balance AS FLOAT)) OVER (ORDER BY book_date), CAST(closing_balance AS FLOAT)) AS opening_balance,remarks FROM book_keeping WHERE isDeleted = 0 AND userId = " + data.userId + " AND userType = " + data.userType + " AND book_date BETWEEN '" + data.startDate + "' AND '" + data.endDate + "' " + searchCondition + " ORDER BY b_id DESC LIMIT ? OFFSET ?"
            var [resp] = await readConn.query(sql, [data.limit, data.offset]);
            let countSql = "SELECT COUNT(b_id) as totalCount FROM book_keeping WHERE isDeleted = 0 AND userId = " + data.userId + " AND userType = " + data.userType + " AND book_date BETWEEN '" + data.startDate + "' AND '" + data.endDate + "'" + searchCondition +"'"
            var [countresp] = await readConn.query(countSql);
        } else {
            let sql = "SELECT b_id,book_date,b_description,CAST(debit_amount AS FLOAT) AS debit_amount,debit_mode,CAST(credit_amount AS FLOAT) AS credit_amount,credit_mode,CAST(closing_balance AS FLOAT) AS closing_balance,CAST(closing_balance AS FLOAT) AS actual_opening_balance,COALESCE(LAG(CAST(closing_balance AS FLOAT)) OVER (ORDER BY book_date), CAST(closing_balance AS FLOAT)) AS opening_balance,remarks FROM book_keeping WHERE isDeleted = 0 AND userId = " + data.userId + " AND userType = " + data.userType + searchCondition +" ORDER BY b_id DESC LIMIT ? OFFSET ?"
            var [resp] = await readConn.query(sql, [data.limit, data.offset]);

            let countSql = "SELECT COUNT(b_id) as totalCount FROM book_keeping WHERE isDeleted = 0 AND userId = " + data.userId + " AND userType = " + data.userType + searchCondition + ""
            var [countresp] = await readConn.query(countSql);
        }
        let actual_opening_balanceSql = "SELECT COALESCE(LAG(CAST(closing_balance AS FLOAT)) OVER (ORDER BY b_id),CAST(closing_balance AS FLOAT)) + (SELECT (credit_amount - debit_amount) FROM book_keeping WHERE isDeleted =0 AND userId = " + data.userId + " AND userType = " + data.userType + " ORDER BY b_id DESC LIMIT 1) as actual_opening_balance FROM book_keeping WHERE isDeleted = 0 AND userId = " + data.userId + " AND userType = " + data.userType + " ORDER BY b_id DESC LIMIT 1"
        let [opening_balance_resp] = await readConn.query(actual_opening_balanceSql);
        var resp2 = [];
        resp2.push(opening_balance_resp ? opening_balance_resp[0].actual_opening_balance : 0);
        resp2.push(countresp[0].totalCount);
        resp2.push(resp);
        return resp2 ? resp2 : [];
    }
    catch (err) {
        logger.error('bookkeeping list service error:', err);
        console.log('bookkeeping list service error: ', err);
        return false;
    }
};
