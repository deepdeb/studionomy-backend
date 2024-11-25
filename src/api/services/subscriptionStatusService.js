const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.subscriptionStatusChange = async (data) => {
    try {
        let sql = "UPDATE subscriptions SET isActive = ? WHERE subs_id = ?"
        const [resp] = await writePool.query(sql, [data.isActive, data.subs_id]);
        return "Subscription status change successfully";
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}