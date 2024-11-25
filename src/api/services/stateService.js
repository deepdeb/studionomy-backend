const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getAllStateList = async (data) => {
    try {
        let sql = "SELECT state_id,state_name,country_id from state where isDeleted=0"
        const [resp] = await readConn.query(sql);
        return resp ? resp : [];
    }
    catch (err) {
        console.log("error>>>>>", e);
        logger.error(err);
        return false;
    }
}