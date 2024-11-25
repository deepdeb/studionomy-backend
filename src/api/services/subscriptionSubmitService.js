const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.subscriptionSubmit = async (data) => {
    try {
        if(data.subs_id == 0) {
            let sql = "INSERT INTO subscriptions (subs_type,subs_for,subs_name,discount_type,discount,amount,final_amount,validity,no_of_jobs) VALUES(?,?,?,?,?,?,?,?,?)"
            const [resp] = await writePool.query(sql, [data.subs_type, data.subs_for, data.subs_name, data.discount_type, data.discount, data.amount, data.final_amount, data.validity, data.no_of_jobs]);
            return "Subscription Add successfully";
        }
        else {
            let sql = "UPDATE subscriptions SET subs_type = ?, subs_for = ?, subs_name = ?, discount_type = ?, discount = ?, amount = ?, final_amount = ?, validity = ?, no_of_jobs = ? WHERE subs_id = ?"
            const [resp] = await writePool.query(sql, [data.subs_type, data.subs_for, data.subs_name, data.discount_type, data.discount, data.amount, data.final_amount, data.validity, data.no_of_jobs, data.subs_id]);
            return "Subscription Updated successfully";
        }
    }
    catch (err) {
        console.log('error: ', err);
        logger.error(err);
        return false;
    }
}