const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.userDetails = async (data) => {
    try {
        let sql = "SELECT u.userId,u.userType,u.orgName,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutusImg,u.reffeedbackImg,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,u.profile_share,u.state_id,u.country_id,u.passcode,s.state_name,c.country_name,(SELECT COUNT(inv_id) as invcount FROM inventary WHERE userId = " + data.userId + " AND userType = " + data.userType + " AND isDeleted = 0) as totalInventary FROM users as u, state as s,country as c WHERE u.userId=? AND u.userType= " + data.userType + " AND u.isDeleted=0 AND u.state_id = s.state_id AND c.country_id = u.country_id"
        const [resp] = await readConn.query(sql, [data.userId]);
        return resp;
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}