const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.userDetails = async (data) => {
    try {
        let sql = "SELECT u.userId,u.userType,u.orgName,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutusImg,u.reffeedbackImg,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,u.password,u.profile_share,u.state_id,u.country_id,u.passcode from users as u where u.email=?"
        const [resp] = await readConn.query(sql, [data.toRegisteredMail]);
        return resp;
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}