const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getAllFeedbackList = async (data) => {
    try {
        if (data.name) {
            let sql = "SELECT f_id,feedback_details,name,mobile,alt_mobile,email,profileImg,submited_date,isShow from feedback where isDeleted=0 AND name LIKE '%" + data.name + "%' ORDER BY f_id DESC"
            var [resp1] = await readConn.query(sql);
            let countSql = "SELECT COUNT(f_id) as totalFeedback FROM feedback WHERE isDeleted=0 AND name LIKE '%" + data.name + "%'"
            var [resp2] = await readConn.query(countSql);
        } else {
            let sql = "SELECT f_id,feedback_details,name,mobile,alt_mobile,email,profileImg,submited_date,isShow from feedback where isDeleted=0 ORDER BY f_id DESC LIMIT ? OFFSET ?"
            var [resp1] = await readConn.query(sql, [data.limit, data.offset]);
            let countSql = "SELECT COUNT(f_id) as totalFeedback FROM feedback WHERE isDeleted=0"
            var [resp2] = await readConn.query(countSql);
        }
        let resp = [];
        resp.push(resp1);
        resp.push(resp2[0].totalFeedback);
        return resp ? resp : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}