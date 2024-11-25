const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.dashboardCount = async (data) => {
    try {
        let countStudioUserSql = "SELECT COUNT(userId) as totalStudioUser FROM users WHERE isDeleted=0 AND userType = 0"
        const [resp1] = await readConn.query(countStudioUserSql);
        let countFreelancerUserSql = "SELECT COUNT(userId) as totalFreelancerUser FROM users WHERE isDeleted=0 AND userType = 1"
        const [resp2] = await readConn.query(countFreelancerUserSql);
        let countEquipmentUserSql = "SELECT COUNT(userId) as totalEquipmentUser FROM users WHERE isDeleted=0 AND userType = 2"
        const [resp3] = await readConn.query(countEquipmentUserSql);
        let countSubscriptionSql = "SELECT COUNT(subs_id) as totalSubscription FROM subscriptions WHERE isDeleted=0"
        const [resp4] = await readConn.query(countSubscriptionSql);
        let resp = [];
        resp.push(resp1[0].totalStudioUser);
        resp.push(resp2[0].totalFreelancerUser);
        resp.push(resp3[0].totalEquipmentUser);
        resp.push(resp4[0].totalSubscription);
        return resp ? resp : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}