const writePool = require('../../config/mysql').writePool
const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.commonDelete = async (data) => {
    try {
        if (data.table_name == 'inventary') {
            let countSql = "SELECT COUNT(job_id) as jobnumber FROM jobs WHERE job_status = 0 AND isDeleted = 0 AND equipments LIKE '%" + data.id + "%'";
            const [countResp] = await readPool.query(countSql);
            var count = countResp[0].jobnumber;
        } else {
            count = 0;
        }
        if (count == 0) {
            if (data.userType) {
                var sql = "UPDATE " + data.table_name + " SET isDeleted = 1 WHERE " + data.table_pId + "=" + data.id + " AND userId=" + data.userId + " AND userType=" + data.userType + ""
            } else {
                var sql = "UPDATE " + data.table_name + " SET isDeleted = 1 WHERE " + data.table_pId + "=" + data.id + " AND userId=" + data.userId + ""
            }
            const [resp] = await writePool.query(sql);
            if (data.table_name == 'jobs') {
                let sql = "UPDATE inventary_book SET isDeleted = 1 WHERE job_id = " + data.id + " AND userId=" + data.userId + ""
                const [resp] = await writePool.query(sql);
                let sqlEmp = "UPDATE employee_book SET isDeleted = 1 WHERE job_id = " + data.id + " AND userId=" + data.userId + ""
                const [resp1] = await writePool.query(sqlEmp);
            }
            return "Deleted successfully";
        } else {
            return "Sorry!!! Your Inventory is assigned to the job"
        }

    }
    catch (err) {
        logger.error(err);
        return false;
    }
}