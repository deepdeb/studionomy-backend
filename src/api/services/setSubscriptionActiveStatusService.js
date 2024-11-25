const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.setSubscriptionActiveStatus = async () => {
    try {
        const setStatusSql = "UPDATE buy_subscription SET isActive = ? WHERE end_date < curdate() AND subs_type = ?"
        const [setStatusResp] = await writePool.query(setStatusSql, [0, 0]);
        return "Subscription status changed";
    }
    catch (err) {
        console.log('error: ', err);
        logger.error(err);
        return false;
    }
}