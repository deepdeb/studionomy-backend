const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.freelancerSubmit = async (data) => {
    try {
        if (data.freelancerId == 0) {
            let sql = "INSERT INTO freelancer (userId,userType,freelancerName,freelancerPhone,freelancerEmail,freelancerAddr,freelancerDateOfJoin) VALUES(?,?,?,?,?,?,?)"
            const [resp] = await writePool.query(sql, [data.userId, data.userType, data.freelancerName, data.freelancerPhone, data.freelancerEmail, data.freelancerAddr, data.freelancerDateOfJoin]);
            return "Freelancer added successfully";
        } else {
            let sql = "UPDATE freelancer SET freelancerName = ?,freelancerPhone = ?,freelancerEmail = ?,freelancerAddr = ?,freelancerDateOfJoin =? WHERE userId = ? AND userType = ? AND freelancerId = ?"
            const [resp] = await writePool.query(sql, [data.freelancerName, data.freelancerPhone, data.freelancerEmail, data.freelancerAddr, data.freelancerDateOfJoin, data.userId, data.userType, data.freelancerId]);
            return "Freelancer updated successfully";
        }

    }
    catch (err) {
        logger.error(err);
        return false;
    }
}