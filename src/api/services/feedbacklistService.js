const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.getAllApprovedFeedbackList = async (data) => {
    try {
        let sql = "SELECT feedback_details,name,mobile,alt_mobile,email,profileImg,submited_date from feedback where isDeleted=0 AND isShow = 1 ORDER BY f_id DESC"
        const [resp] = await readConn.query(sql);
        return resp ? resp : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
};
