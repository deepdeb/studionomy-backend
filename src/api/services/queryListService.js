const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getQueryList = async (data) => {
    try {
        if (data.name) {
            let sql = "SELECT q_id,querie_details,name,mobile,alt_mobile,email,submited_date from queries where isDeleted=0 AND name LIKE '%" + data.name + "%' ORDER BY q_id DESC"
            var [resp1] = await readConn.query(sql);
            let countSql = "SELECT COUNT(q_id) as totalQuery FROM queries WHERE isDeleted=0 AND name LIKE '%" + data.name + "%'"
            var [resp2] = await readConn.query(countSql);
        } else {
            let sql = "SELECT q_id,querie_details,name,mobile,alt_mobile,email,submited_date from queries where isDeleted=0 ORDER BY q_id DESC LIMIT ? OFFSET ?"
            var [resp1] = await readConn.query(sql, [data.limit, data.offset]);
            let countSql = "SELECT COUNT(q_id) as totalQuery FROM queries WHERE isDeleted=0"
            var [resp2] = await readConn.query(countSql);
        }

        let resp = [];
        resp.push(resp1);
        resp.push(resp2[0].totalQuery);
        return resp ? resp : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}