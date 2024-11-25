const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getAllEquipmentCategoryList = async () => {
    try {
        let sql = "SELECT * from equipment_category where isDeleted=0"
        const [resp] = await readConn.query(sql);
        return resp ? resp : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}