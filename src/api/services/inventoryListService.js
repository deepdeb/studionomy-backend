const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getInventoryList = async (data) => {
    try {
        data.startDate = data.startDate ? data.startDate + ' 00:00:00' : data.startDate;
        data.endDate = data.endDate ? data.endDate + ' 23:59:59' : data.endDate;

        if (data.limit >= 10 && data.offset >= 0) {
            let sql = "SELECT i.equ_cate_id,i.equ_sub_cate,i.company,e.equ_categoryName,i.inv_code,i.equ_sub_cate,sub.sub_cate_name,b.brand_name,i.modelName,i.invPrice,i.inv_id,i.rentout,b.brand_name from inventary as i,equipment_category as e,brand as b,equipment_subcategory as sub where i.equ_cate_id = e.equ_cate_id AND i.equ_sub_cate = sub.sub_cate_id AND b.brand_id = i.company AND i.userId = " + data.userId + " AND i.userType = " + data.userType + " AND i.isDeleted=0 ORDER BY i.inv_id DESC LIMIT " + data.limit + " OFFSET " + data.offset + ""
            var [resp] = await readConn.query(sql);
            var countSql = "SELECT COUNT(inv_id) as totalCount FROM inventary WHERE userId = " + data.userId + " AND userType = " + data.userType + " AND isDeleted = 0"
            var [respCount] = await readConn.query(countSql);
        }
        else if (data.startDate && data.endDate) {
            let sql = "SELECT i.inv_code,i.inv_id FROM inventary as i LEFT JOIN inventary_book as ib ON FIND_IN_SET(i.inv_id, ib.inv_id) > 0 AND ib.userId=" + data.userId + " AND ib.userType = " + data.userType + " AND ib.isDeleted = 0 AND (ib.bookingStatus = 1  OR ib.bookingStatus = 0) AND (ib.booked_from BETWEEN '" + data.startDate + "' AND '" + data.endDate + "' OR ib.booked_to BETWEEN '" + data.startDate + "' AND '" + data.endDate + "') WHERE i.userId =" + data.userId + " AND i.userType = " + data.userType + " AND i.isDeleted = 0 AND ib.inv_id IS NULL"
            console.log("sql>>>>>",sql);
            var [resp] = await readConn.query(sql);
        }
        else {
            let sql = "SELECT i.equ_cate_id,i.equ_sub_cate,i.company,e.equ_categoryName,i.inv_code,i.equ_sub_cate,sub.sub_cate_name,b.brand_name,i.modelName,i.invPrice,i.inv_id,i.rentout,b.brand_name from inventary as i,equipment_category as e,brand as b,equipment_subcategory as sub where i.equ_cate_id = e.equ_cate_id AND i.equ_sub_cate = sub.sub_cate_id AND b.brand_id = i.company AND i.userId = ? AND i.userType = ? AND i.isDeleted=0 ORDER BY i.inv_id DESC"
            var [resp] = await readConn.query(sql, [data.userId, data.userType]);
        }
        let resp2 = []
        resp2.push(respCount ? respCount[0].totalCount : 0);
        resp2.push(resp ? resp : []);
        return resp2 ? resp2 : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}