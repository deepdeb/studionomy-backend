const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.acceptPayment = async (data) => {
    try {

        let sql = "UPDATE fl_eo_payment_details SET credit_amount = ?, payment_status = 1, status_changed_at = NOW() WHERE fl_eo_payment_id = ?"
        const [resp] = await writePool.query(sql, [data.credit_amount, data.fl_eo_payment_id]);

        return 'Payment updated successfully'
    }
    catch (err) {
        console.log('accept payment service error: ', err)
        logger.error('accept payment service error: ', err);
        return false;
    }
}