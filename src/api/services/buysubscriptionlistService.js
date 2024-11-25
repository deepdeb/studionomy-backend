const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getbuySubscriptionList = async (data) => {
    try {
        let jobsUsedCheckSql = "SELECT total_jobs - COALESCE(jobs_used, 0) as main_jobs_remaining FROM buy_subscription WHERE userId = ? AND userType = ? AND subs_type = ? AND isActive = ?"
        const [jobsUsedCheckResp] = await readConn.query(jobsUsedCheckSql, [data.userId, data.userType, 0, 1]);

        //purchased package sql
        let package_sql = "SELECT u.name, s.subs_name, s.final_amount, s.validity, bs.subs_id, bs.buy_subs_id, bs.subs_type, bs.userId, bs.userType, bs.total_jobs, bs.jobs_used, bs.total_jobs - COALESCE(bs.jobs_used, 0) as remaining_jobs, DATE_FORMAT(bs.start_date, '%d-%m-%Y') as start_date, DATE_FORMAT(bs.end_date, '%d-%m-%Y') as end_date, bs.isActive FROM buy_subscription AS bs JOIN subscriptions AS s ON s.subs_id = bs.subs_id JOIN users AS u ON u.userId = bs.userId WHERE bs.subs_type = 0 AND bs.userId = ? AND bs.isDeleted = 0 AND bs.isActive = 1 LIMIT ? OFFSET ?"
        const [package_resp] = await readConn.query(package_sql, [data.userId, data.limit, data.offset]);

        //purchased topup sql
        let topup_sql = "SELECT u.name, s.subs_name, s.final_amount, s.validity, bs.subs_id, bs.buy_subs_id, bs.subs_type, bs.userId, bs.userType, bs.total_jobs, bs.jobs_used, bs.total_jobs - COALESCE(bs.jobs_used, 0) as remaining_jobs, DATE_FORMAT(bs.start_date, '%d-%m-%Y') as start_date, DATE_FORMAT(bs.end_date, '%d-%m-%Y') as end_date, bs.isActive FROM buy_subscription AS bs JOIN subscriptions AS s ON s.subs_id = bs.subs_id JOIN users AS u ON u.userId = bs.userId WHERE bs.subs_type = 1 AND bs.userId = ? AND bs.isDeleted = 0 AND bs.isActive = 1 LIMIT ? OFFSET ?"
        const [topup_resp] = await readConn.query(topup_sql, [data.userId, data.limit, data.offset]);

        console.log(topup_resp[0]);

        return [ package_resp[0]?.buy_subs_id != null ? package_resp : [], jobsUsedCheckResp[0]?.main_jobs_remaining ];
    }
    catch (err) {
        console.log('Error: ', err)
        logger.error(err);
        return false;
    }
}