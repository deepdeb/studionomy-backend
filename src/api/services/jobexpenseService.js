const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
const { readPool } = require('../../config/mysql');
// const readPool = require('../../config/mysql').readPool;
exports.expenseForJob = async (data) => {
    try {
        // let sql = "INSERT INTO job_payment_details (userId,userType,job_id,payment_amount) VALUES(?,?,?,?)"
        // const [resp] = await writePool.query(sql, [data.userId, data.userType, data.job_id, data.payment_amount]);
        // return "Payment submitted successfully";

            let insertExpenseAndJobDetailsSql = "INSERT INTO job_book_keeping (userId, userType, job_id, job_number, job_value, payment_amount, payment_date, payment_description, payment_type, payment_status, job_details) VALUES(?,?,?,?,?,?,?,?,?,?,?)"
            await writePool.query(insertExpenseAndJobDetailsSql, [data.userId, data.userType, data.job_id, data.job_number, data.job_value, data.exp_payment_amount, data.exp_payment_date, data.exp_payment_description, data.exp_payment_type, "debit", data.job_details])

            let profitSql = "SELECT (SELECT SUM(payment_amount) FROM job_book_keeping WHERE payment_status = 'credit' AND job_id =? AND job_number =? AND userId = ? AND userType = ?) - (SELECT SUM(payment_amount) FROM job_book_keeping WHERE payment_status = 'debit' AND job_id =? AND job_number =? AND userId = ? AND userType = ?) AS profit FROM job_book_keeping"

            const [resp] = await readPool.query(profitSql, [data.job_id, data.job_number, data.userId, data.userType, data.job_id, data.job_number, data.userId, data.userType]);
            //console.log(resp[0].profit);

            let lastInsertIdQuery = "SELECT LAST_INSERT_ID() as lastId";
            let result = await writePool.query(lastInsertIdQuery);

            let lastInsertId = result[0][0].lastId;
            //console.log(result[0][0].lastId)

            let updateProfitSql = "UPDATE job_book_keeping SET profit = ? WHERE payment_status = 'debit' AND jb_id = ? AND job_id =? AND job_number =? AND userId = ? AND userType = ?"
            await writePool.query(updateProfitSql, [resp[0].profit, lastInsertId, data.job_id, data.job_number, data.userId, data.userType])

            return "Expense submitted successfully";
        
    }
    catch (err) {
        console.log(err)
        logger.error(err);
        return false;
    }
}