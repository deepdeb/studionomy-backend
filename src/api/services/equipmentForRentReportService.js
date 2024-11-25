const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");

exports.getEquipmentForRentListReport = async (data) => {
    try {
        let sql = "SELECT i.equ_cate_id,i.equ_sub_cate,i.company,e.equ_categoryName,i.inv_code,i.equ_sub_cate,sub.sub_cate_name,b.brand_name,i.modelName,i.inv_id,i.rentout,b.brand_name from inventary as i,equipment_category as e,brand as b,equipment_subcategory as sub where i.equ_cate_id = e.equ_cate_id AND i.equ_sub_cate = sub.sub_cate_id AND b.brand_id = i.company AND i.userId = " + data.userId + " AND i.userType = " + data.userType + " AND i.rentout = 1 AND i.isDeleted=0 ORDER BY i.inv_id DESC"
        var [resp] = await readConn.query(sql);

        if (resp) {
            return resp;
        }
    }
    catch (err) {
        console.log("equipment for rent list report service error: ", err);
        logger.info("equipment for rent list report service error: ", err);
        return false;
    }
}