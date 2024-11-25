const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.myNetworks = async (data) => {
    try {

        let sql = "SELECT myNetworks FROM networks WHERE isDeleted = 0 AND userId = " + data.userId + " AND userType = " + data.userType + ""
        let [resp] = await readConn.query(sql);
        var networks = [];
        for (let i = 0; i < resp.length; i++) {
            let userSql = "SELECT u.userId,u.userType,u.orgName,u.name,u.address,u.city,u.pin,u.mobile,u.alt_mobile,GROUP_CONCAT(i.inv_code SEPARATOR ',') AS inv_code FROM users as u LEFT JOIN inventary as i ON i.userId = u.userId AND i.rentout = 1 WHERE u.isDeleted = 0 AND u.profile_share = 1 AND u.userId = "+resp[i].myNetworks+""
            let userResp = await readConn.query(userSql);
            networks.push(userResp[0]);
            var flattenedNetworks = networks.flat();
        }
        return flattenedNetworks ? flattenedNetworks : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}