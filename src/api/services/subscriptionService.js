const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getSubscriptionList = async (data) => {
    try {
        let sql1 = "SELECT subs_id,subs_type,subs_for,subs_name,discount_type,discount,amount,final_amount,validity,no_of_jobs from subscriptions where subs_for=? AND subs_type=0 AND isActive = 1 AND isDeleted=0"
        const [resp1] = await readConn.query(sql1, [data.subs_for]);
        let sql2 = "SELECT subs_id,subs_type,subs_for,subs_name,discount_type,discount,amount,final_amount,validity,no_of_jobs from subscriptions where subs_for=? AND subs_type=1 AND isActive = 1 AND isDeleted=0"
        const [resp2] = await readConn.query(sql2, [data.subs_for]);
        let resp = [];
        resp.push(resp1)
        resp.push(resp2)
        return resp;
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}