const writePool = require('../../config/mysql').writePool
const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.addToMyNetwork = async (data) => {
    try {
        let countSql = "SELECT myNetworks,COUNT(networkId) as total from networks where isDeleted=0 AND userId = " + data.userId + " AND userType = " + data.userType + " AND myNetworks = " + data.myNetworks + ""
        const [countresp] = await readConn.query(countSql);

        if (countresp[0].total > 0) {
            return "Already added in your network";
        } else {
            let sql = "INSERT INTO networks (userId,userType,myNetworks) VALUES(?,?,?)"
            const [resp] = await writePool.query(sql, [data.userId, data.userType, data.myNetworks]);
            return "Added Successfully";
        }
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}