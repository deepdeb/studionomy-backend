const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getSubscriptionList = async (data) => {
    try {
        if (data.subs_name) {
            let sql = "SELECT subs_id,subs_type,subs_for,subs_name,discount_type,discount,amount,final_amount,validity,no_of_jobs,isActive from subscriptions where isDeleted=0 AND subs_name LIKE '%" + data.subs_name + "%' ORDER BY subs_id DESC"
            var [resp1] = await readConn.query(sql);
            let sqlCount = "SELECT COUNT(subs_id) as totalSubscription FROM subscriptions where isDeleted=0 AND subs_name LIKE '%" + data.subs_name + "%'"
            var [resp2] = await readConn.query(sqlCount);
        } else {
            let sql = "SELECT subs_id,subs_type,subs_for,subs_name,discount_type,discount,amount,final_amount,validity,no_of_jobs,isActive from subscriptions where isDeleted=0 ORDER BY subs_id DESC LIMIT ? OFFSET ?"
            var [resp1] = await readConn.query(sql, [data.limit, data.offset]);
            let sqlCount = "SELECT COUNT(subs_id) as totalSubscription FROM subscriptions where isDeleted=0"
            var [resp2] = await readConn.query(sqlCount);
        }
        let resp = [];
        resp.push(resp1);
        resp.push(resp2);
        return resp ? resp : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}