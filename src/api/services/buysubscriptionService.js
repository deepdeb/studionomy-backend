const writePool = require('../../config/mysql').writePool
const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.buySubscription = async (data) => {
    try {
        let existingSubscriptionSql = "SELECT bs.buy_subs_id, bs.start_date, bs.end_date, bs.validity FROM buy_subscription bs JOIN subscriptions s ON bs.subs_id = s.subs_id WHERE bs.subs_type = ? AND s.subs_for = ? AND bs.userId = ? AND bs.userType = ? AND bs.isActive = ?"
        const [existingSubscriptionResp] = await readPool.query(existingSubscriptionSql, [0, data.subs_for, data.userId, data.userType, 1]);

        if (data.subs_type != 1) {
            if (existingSubscriptionResp.length == 0) {
                let sql = "INSERT INTO buy_subscription (subs_id, subs_type, userId, userType, payment_amount, transaction_id, payment_status, total_jobs, validity, start_date, end_date, isActive) VALUES(?,?,?,?,?,?,?,?,?,CURDATE(),DATE_ADD(CURDATE(), INTERVAL ? DAY) + INTERVAL '23:59:59' HOUR_SECOND,?)"
                const [resp] = await writePool.query(sql, [data.subs_id, data.subs_type, data.userId, data.userType, data.final_amount, data.transaction_id, data.response_code, data.no_of_jobs, data.validity, data.validity, 1]);
                return 'Subscription purchased successfully'
            }
            else {
                return "You already have an active plan"
            }
        }
        else {
            if (existingSubscriptionResp.length == 0) {
                return 'Main plan not found. Please buy a main plan first then buy top-up'
            } 
            else {
                let end_date = existingSubscriptionResp[0].end_date
                let start_date = existingSubscriptionResp[0].start_date

                let topupSql = "INSERT INTO buy_subscription (subs_id, subs_type, userId, userType, payment_amount, transaction_id, payment_status, total_jobs, validity, start_date, end_date, isActive) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
                let topupResp = await writePool.query(topupSql, [data.subs_id, data.subs_type, data.userId, data.userType, data.final_amount, data.transaction_id, data.response_code, Number(data.no_of_jobs), data.validity, start_date, end_date, 1]);
                if (topupResp[0].affectedRows > 0) {
                    return 'Topup added successfully'
                }
            }
        }
    }
    catch (err) {
        console.log('error: ', err)
        logger.error(err);
        return false;
    }
}