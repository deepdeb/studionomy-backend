const writePool = require('../../config/mysql').writePool
const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.bookkeepingSubmit = async (data) => {
    try {
        if (data.b_id != 0) {
            let sql = "UPDATE book_keeping SET book_date = ?,b_description = ?,debit_amount = ?,debit_mode = ?,credit_amount = ?,credit_mode = ?,closing_balance = ?,remarks = ? WHERE userId = ? AND userType = ? AND b_id = ? AND isDeleted = 0"
            const [resp] = await writePool.query(sql, [data.book_date, data.b_description, data.debit_amount, data.debit_mode, data.credit_amount, data.credit_mode, data.closing_balance, data.remarks, data.userId, data.userType, data.b_id]);
            return "Record update successfully"
        }
        else {
            let sql = "INSERT INTO book_keeping (userId,userType,book_date,b_description,debit_amount,debit_mode,credit_amount,credit_mode,closing_balance,cust_phone_num, remarks) VALUES(?,?,?,?,?,?,?,?,?,?,?)"
            const [resp] = await writePool.query(sql, [data.userId, data.userType, data.book_date, data.b_description, data.debit_amount, data.debit_mode, data.credit_amount, data.credit_mode, data.closing_balance, data.cust_phone_num, data.remarks]);
            return "Record submit successfully"
        }

    }
    catch (err) {
        logger.error(err);
        return false;
    }
}