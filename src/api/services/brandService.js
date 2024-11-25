const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getAllBrandList = async () => {
    try {
        let sql = "SELECT * from brand where isDeleted=0"
        const [resp] = await readConn.query(sql);
        return resp ? resp : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}