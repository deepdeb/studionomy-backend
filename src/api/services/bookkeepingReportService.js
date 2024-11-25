const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");

exports.getBookkeepingListReport = async (data) => {
    try {
        let sql = "SELECT b_id,DATE_FORMAT(book_date, '%Y-%m-%d') as book_date,b_description,CAST(debit_amount AS FLOAT) AS debit_amount,debit_mode,CAST(credit_amount AS FLOAT) AS credit_amount,credit_mode,CAST(closing_balance AS FLOAT) AS closing_balance,CAST(closing_balance AS FLOAT) AS actual_opening_balance,COALESCE(LAG(CAST(closing_balance AS FLOAT)) OVER (ORDER BY book_date), CAST(closing_balance AS FLOAT)) AS opening_balance,remarks FROM book_keeping WHERE isDeleted = 0 AND userId = " + data.userId + " AND userType = " + data.userType + " AND book_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'"
        var [resp] = await readConn.query(sql);
        if (resp) {
            return resp
        }
    }
    catch (err) {
        console.log("bookkeeping list report service error: ", err);
        logger.error("bookkeeping list report service error: ", err);
        return false;
    }
}