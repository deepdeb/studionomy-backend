const writePool = require("../../config/mysql").writePool;
const logger = require("../../config/logger");
exports.userUpdate = async (data) => {
    try {
        let sql = "UPDATE users SET userName = ?,orgName = ?,name = ?,address = ?,location = ?,city = ?,pin = ?,state_id = ?,country_id = ?,mobile = ?,alt_mobile = ?,email = ?,workImg1 = ?,workImg2 = ?,workImg3 = ?,aboutusImg = ?,reffeedbackImg = ?,aboutYouself = ?,aboutWork = ?,aboutReference = ?,FBLink = ?,InstaLink = ?,YoutubeLink = ?,jdLink = ?,websiteLink = ?,linkedInLink = ?,reference = ?,passcode = ? WHERE userId = ? AND userType = ?"
        const [resp] = await writePool.query(sql, [data.userName, data.studioName, data.name, data.address, data.location, data.city, data.pin, data.state, data.country, data.phoneNo, data.altPhoneNo, data.email, data.workImg1, data.workImg2, data.workImg3, data.aboutusImg, data.reffeedbackImg, data.aboutYouself, data.aboutWork, data.aboutReference, data.fbLink, data.instaLink, data.youtubeLink, data.jdLink, data.websiteLink, data.linkedInLink, data.reference, data.passcode, data.userId, data.registrationType]);
        return "Profile updated successfully";
    }
    catch (err) {
        logger.error(err);
    }
}

