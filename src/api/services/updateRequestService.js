const writePool = require('../../config/mysql').writePool
const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.updateRequest = async (data) => {
    try {
        if(data.reqType === 'accept') {
            const acceptSql = "UPDATE request_for_booking SET req_status = 'accepted', update_date = curdate() WHERE req_id = ?"
            const [acceptResp] = await writePool.query(acceptSql, [data.req_id]);

            // const subscriptionUpdateSql = "UPDATE buy_subscription SET jobs_used = COALESCE(jobs_used, 0) + 1 WHERE subs_type = ? AND userId = ? AND userType = ? AND isActive = ?"
            // const [subscriptionUpdateResp] = await readPool.query(subscriptionUpdateSql, [0, data.userId, data.userType, 1]);

            return "Request accepted successfully";
        } 
        else if (data.reqType === 'decline') {
            const declineSql = "UPDATE request_for_booking SET req_status = 'declined', update_date = curdate() WHERE req_id = ?"
            const [declineResp] = await writePool.query(declineSql, [data.req_id]);
            return "Request declined successfully";
        }
    }
    catch (err) {
        console.log('error: ', err);
        logger.error(err);
        return false;
    }
}