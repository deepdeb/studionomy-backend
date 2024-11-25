const readConn = require('../../config/mysql').readPool;
const logger = require("../../config/logger");

exports.getEmployeeAttendanceList = async (data) => {
    try {
        let sql = `
            SELECT 
                ea.empAttn_id,
                ea.emp_id,
                e.empName,
                e.empPhone,
                e.empEmail,
                e.empAddr,
                GROUP_CONCAT(DATE_FORMAT(ea.empEntryTime, '%d-%m-%y')) as empEntryTime,
                ea.empEntryTime as eEntryTime,
                GROUP_CONCAT(ea.emp_attendance) as emp_attendance,
                GROUP_CONCAT(ea.emp_outdoor_hrs) as emp_outdoor_hrs,
                ea.empRemarks 
            FROM 
                employee as e
            INNER JOIN 
                employee_attendance as ea ON e.emp_id = ea.emp_id
            WHERE 
                e.userId = ? 
                AND e.userType = ? 
                AND e.isDeleted = 0 
                AND ea.isDeleted = 0`;

        const params = [data.userId, data.userType];

        if (data.emp_id != 0) {
            sql += " AND ea.emp_id = ?";
            params.push(data.emp_id);
        }

        if (data.year && data.month) {
            const startDate = new Date(data.year, data.month - 1, 1).toISOString().split('T')[0];
            const endDate = new Date(data.year, data.month, 0).toISOString().split('T')[0];

            sql += " AND ea.empEntryTime BETWEEN ? AND ?";
            params.push(startDate, endDate);
        }

        sql += " GROUP BY ea.emp_id";
        const [resp] = await readConn.query(sql, params);

        const respCount = resp.length > 0 ? resp[0].totalCount : 0;

        return [respCount, resp];
    } catch (err) {
        logger.error(err);
        return false;
    }
};
