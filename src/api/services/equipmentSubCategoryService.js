const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getEquipmentSubCategoryListById = async (data) => {
    try {
        let sql = "SELECT DISTINCT(sub.sub_cate_id),sub.sub_cate_name from equipment_subcategory as sub,equipment_category as e where sub.isDeleted=0 AND (sub.equ_cate_id LIKE '" +data.equ_cate_id+ ",%%' OR sub.equ_cate_id LIKE " + data.equ_cate_id + " OR sub.equ_cate_id LIKE '%%," + data.equ_cate_id + ",%%' OR sub.equ_cate_id LIKE '%%," + data.equ_cate_id + "')"
        const [resp] = await readConn.query(sql);
        return resp ? resp : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}