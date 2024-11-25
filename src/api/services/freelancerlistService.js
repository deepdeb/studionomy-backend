const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getFreelancerList = async (data) => {
    try {
        data.startDate = data.startDate ? data.startDate + ' 00:00:00' : data.startDate;
        data.endDate = data.endDate ? data.endDate + ' 23:59:59' : data.endDate;
        if (data.limit >= 10 && data.offset >= 0 && data.freelancerId == 0) {
            let sql = "SELECT freelancerId,freelancerName,freelancerPhone,freelancerEmail,freelancerAddr,DATE_FORMAT(freelancerDateOfJoin,'%d-%m-%y') as freelancerDateOfJoin FROM freelancer WHERE userId = ? AND userType = ? AND isDeleted = 0 LIMIT ? OFFSET ?"
            var [resp] = await readConn.query(sql, [data.userId, data.userType, data.limit, data.offset]);
            var countSql = "SELECT COUNT(freelancerId) as totalCount FROM freelancer WHERE userId = " + data.userId + " AND userType = " + data.userType + " AND isDeleted = 0"
            var [respCount] = await readConn.query(countSql);

        } else if (Number(data.freelancerId) > 0) {
            let sql = "SELECT freelancerId,freelancerName,freelancerPhone,freelancerEmail,freelancerAddr,DATE_FORMAT(freelancerDateOfJoin,'%d-%m-%y') as freelancerDateOfJoin FROM freelancer WHERE userId = ? AND userType = ? AND isDeleted = 0 AND freelancerId = " + data.freelancerId + " LIMIT ? OFFSET ?"
            var [resp] = await readConn.query(sql, [data.userId, data.userType, data.limit, data.offset]);
            var countSql = "SELECT COUNT(freelancerId) as totalCount FROM freelancer WHERE userId = " + data.userId + " AND userType = " + data.userType + " AND freelancerId = " + data.freelancerId + " AND isDeleted = 0"
            var [respCount] = await readConn.query(countSql);
        }
        else if (data.startDate && data.endDate) {
            let sql = "SELECT e.freelancerId,e.freelancerName,e.freelancerPhone,e.freelancerEmail,e.freelancerAddr,DATE_FORMAT(e.freelancerDateOfJoin,'%d-%m-%y') as freelancerDateOfJoin FROM freelancer as e LEFT JOIN employee_book as eb ON FIND_IN_SET(e.freelancerId,eb.freelancerId) > 0 AND eb.userId = " + data.userId + " AND eb.userType = " + data.userType + " AND eb.isDeleted = 0 AND (eb.booked_from BETWEEN '" + data.startDate + "' AND '" + data.endDate + "' OR eb.booked_to BETWEEN '" + data.startDate + "' AND '" + data.endDate + "') WHERE e.userId = " + data.userId + " AND e.userType = " + data.userType + " AND e.isDeleted = 0 AND eb.freelancerId IS NULL"
            //console.log("sql>>>>", sql);
            var [resp] = await readConn.query(sql);
        }
        else {
            let sql = "SELECT freelancerId,freelancerName,freelancerPhone,freelancerEmail,freelancerAddr,DATE_FORMAT(freelancerDateOfJoin,'%d-%m-%y') as freelancerDateOfJoin FROM freelancer WHERE userId = ? AND userType = ? AND isDeleted = 0"
            var [resp] = await readConn.query(sql, [data.userId, data.userType]);
        }
        let resp2 = [];
        resp2.push(respCount ? respCount[0].totalCount : 0);
        resp2.push(resp ? resp : [])
        return resp2;
    }
    catch (err) {
        console.log("freelancer list error", err);
        logger.error(err);
        return false;
    }
}