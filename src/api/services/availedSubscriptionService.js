const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getAvailedSubscriptionList = async (data) => {
    try {
        let searchCondition = ''
        if(data.searchCondition) {
            searchCondition = "and u.name like '%" + data.searchCondition + "%'"
        }
        let respToSend = []
        let sql = "select u.name, u.orgName, u.mobile, s.subs_name, s.subs_type, s.subs_for, s.final_amount, bs.jobs_remain, s.validity, bs.subs_id, bs.buy_subs_id, bs.transaction_id, bs.start_date, bs.end_date, bs.isActive from buy_subscription as bs join subscriptions as s on s.subs_id = bs.subs_id join users as u on u.userId = bs.userId where bs.isDeleted = 0 and bs.isActive = 1 and bs.end_date > curdate() "+ searchCondition +" limit ? OFFSET ?"
        const [resp] = await readConn.query(sql, [data.limit, data.offset]);

        let count_sql = "select count(bs.subs_id) as count from buy_subscription as bs join users as u on u.userId = bs.userId where bs.isDeleted = 0 and bs.isActive = 1 and bs.end_date > curdate() "+ searchCondition +" limit ? offset ?"
        const [count_resp] = await readConn.query(count_sql, [data.limit, data.offset]);
        if(resp[0].buy_subs_id != null) {
            respToSend.push(resp);
            respToSend.push(count_resp);
        }
        // return resp[0].completejob != 0 ? resp : [];
        // return resp[0].buy_subs_id != null ? resp : [];
        return respToSend;
    }
    catch (err) {
        console.log('Error: ', err)
        logger.error(err);
        return false;
    }
}