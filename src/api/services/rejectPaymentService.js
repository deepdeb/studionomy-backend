const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.rejectPayment = async (data) => {
    try {

        let sql = "UPDATE fl_eo_payment_details SET reject_remarks = ?, status_changed_at = NOW() WHERE fl_eo_payment_id = ?"
        const [resp] = await writePool.query(sql, [data.reject_remarks, data.fl_eo_payment_id]);

        return 'Payment updated successfully'
    }
    catch (err) {
        console.log('reject payment service error: ', err)
        logger.error('reject payment service error: ', err);
        return false;
    }
}