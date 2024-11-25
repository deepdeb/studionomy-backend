const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.userPublicInfo = async (data) => {
    try {
        let sql = "SELECT u.userId,u.userType,u.orgName,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.workImg2,u.workImg3,u.aboutusImg,u.reffeedbackImg,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.profile_share,u.state_id,u.country_id,s.state_name,c.country_name FROM users as u, state as s,country as c WHERE u.userId=? AND u.isDeleted=0 AND u.state_id = s.state_id AND c.country_id = u.country_id"
        const [resp] = await readConn.query(sql, [data.userId]);
        return resp;
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}