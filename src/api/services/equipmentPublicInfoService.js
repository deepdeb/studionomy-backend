const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getEquipmentPublicInfo = async (data) => {
    try {
        let sql = "SELECT e.equ_categoryName,i.equ_sub_cate,i.inv_code,sub.sub_cate_name,b.brand_name,i.modelName,i.invPrice,i.inv_id,i.rentout,b.brand_name from inventary as i,equipment_category as e,brand as b,equipment_subcategory as sub where i.equ_cate_id = e.equ_cate_id AND i.equ_sub_cate = sub.sub_cate_id AND b.brand_id = i.company AND i.userId = ? AND i.isDeleted=0 AND i.rentout = 1 ORDER BY i.inv_id"
        const [resp] = await readConn.query(sql, [data.userId]);
        var countSql = "SELECT COUNT(inv_id) as totalCount FROM inventary WHERE userId = " + data.userId + " AND isDeleted = 0 AND rentout = 1"
        let [respCount] = await readConn.query(countSql);
        let resp2 = [];
        resp2.push(respCount ? respCount[0].totalCount : 0);
        resp2.push(resp ? resp : []);
        return resp2 ? resp2 : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}