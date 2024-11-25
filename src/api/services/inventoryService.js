const writePool = require('../../config/mysql').writePool
const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.inventorysubmit = async (data) => {
    try {
        data.invPrice = data.invPrice ? data.invPrice : 0;

        if (data.inv_id == 0) {
            let inv_No_sql = "SELECT inv_id,inv_No FROM inventary WHERE isDeleted=0 AND userId =? AND userType =? ORDER BY inv_id DESC LIMIT 1"
            const [inv_resp] = await readConn.query(inv_No_sql, [data.userId, data.userType]);
            var generateInvCode = "";
            if (inv_resp.length > 0) {
                var inv_No = inv_resp[0].inv_No + 1;
                generateInvCode = inv_No + data.inv_code;
            } else {
                inv_No = 1001;
                generateInvCode = inv_No + data.inv_code;
            }
            if (generateInvCode) {
                let sql = "INSERT INTO inventary (userId,userType,inv_No,inv_code,equ_cate_id,equ_sub_cate,company,modelName,invPrice,rentout) VALUES(?,?,?,?,?,?,?,?,?,?)"
                const [resp] = await writePool.query(sql, [data.userId, data.userType, inv_No, generateInvCode, data.equ_cate_id, data.equ_sub_cate, data.company, data.modelName, data.invPrice,data.rentout]);
                return "Inventory added successfully";
            }
        } else {
            let inv_No_sql = "SELECT inv_id,inv_No FROM inventary WHERE isDeleted=0 AND userId =? AND userType = ? AND inv_id =?"
            const [inv_resp] = await readConn.query(inv_No_sql, [data.userId, data.userType, data.inv_id]);
            if (inv_resp[0].inv_No != null) {
                let sql = "UPDATE inventary SET equ_cate_id = ?,equ_sub_cate = ?,company = ?,modelName = ?,invPrice = ?,rentout = ? WHERE inv_id = ? AND userId = ? AND userType = ?"
                const [resp] = await writePool.query(sql, [data.equ_cate_id, data.equ_sub_cate, data.company, data.modelName, data.invPrice,data.rentout, data.inv_id, data.userId, data.userType]);
                return "Inventory update successfully";
            }
        }
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}