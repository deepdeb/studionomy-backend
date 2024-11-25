const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
const readPool = require('../../config/mysql').readPool;
exports.paymentForJob = async (data) => {
    try {
        // let sql = "INSERT INTO job_payment_details (userId,userType,job_id,payment_amount) VALUES(?,?,?,?)"
        // const [resp] = await writePool.query(sql, [data.userId, data.userType, data.job_id, data.payment_amount]);
        // return "Payment submitted successfully";

            let insertPaymentAndJobDetailsSql = "INSERT INTO job_book_keeping (userId, userType, job_id, job_number, job_value, payment_amount, payment_date, payment_description, payment_type, payment_status, job_details) VALUES(?,?,?,?,?,?,?,?,?,?,?)"
            await writePool.query(insertPaymentAndJobDetailsSql, [data.userId, data.userType, data.job_id, data.job_number, data.job_value, data.payment_amount, data.payment_date, data.payment_description, data.payment_type, "credit", data.job_details])

            let updateDueQuery = "UPDATE jobs SET due_amount = due_amount - ? WHERE job_id = ? AND userId = ? AND userType = ?";
            await writePool.query(updateDueQuery, [data.payment_amount, data.job_id, data.userId, data.userType]);

            let profitSql = "SELECT (SELECT COALESCE(SUM(payment_amount), 0) FROM job_book_keeping WHERE payment_status = 'credit' AND job_id =? AND job_number =? AND userId = ? AND userType = ?) - (SELECT COALESCE(SUM(payment_amount), 0) FROM job_book_keeping WHERE payment_status = 'debit' AND job_id =? AND job_number =? AND userId = ? AND userType = ?) AS profit FROM job_book_keeping"

            const [resp] = await readPool.query(profitSql, [data.job_id, data.job_number, data.userId, data.userType, data.job_id, data.job_number, data.userId, data.userType]);
            //console.log(resp[0].profit);

            let lastInsertIdQuery = "SELECT LAST_INSERT_ID() as lastId";
            let result = await writePool.query(lastInsertIdQuery);

            let lastInsertId = result[0][0].lastId;
            console.log(result[0][0].lastId)

            let updateProfitSql = "UPDATE job_book_keeping SET profit = ? WHERE payment_status = 'credit' AND jb_id = ? AND job_id =? AND job_number =? AND userId = ? AND userType = ?"
            await writePool.query(updateProfitSql, [resp[0].profit, lastInsertId, data.job_id, data.job_number, data.userId, data.userType])

            return "Payment submitted successfully";
        
    }
    catch (err) {
        //console.log(err)
        logger.error(err);
        return false;
    }
}