const writePool = require("../../config/mysql").writePool;
const logger = require("../../config/logger");
const { readPool } = require("../../config/mysql");
const authHelpers = require("../utils/authHelpers");
exports.userRegistration = async (data) => {
    try {
        // let passwordEncript = await authHelpers.hashPassword(data.password);
        // if (passwordEncript) {
        //     data.password = passwordEncript;
        // }
        const existingUser = await readPool.query(
            "SELECT * FROM users WHERE userName = ? AND isDeleted = 0", data.userName
        );
        if (existingUser[0].length > 0) {
            return "Username already exists";
        }
        const existingEmail = await readPool.query(
            "SELECT * FROM users WHERE email = ? AND isDeleted = 0", data.email
        )
        if(existingEmail[0].length > 0) {
            return "Email already registered";
        }
        if(data.passcode) {
            let sql = "INSERT INTO users (userType,orgName,name,address,location,city,pin,state_id,country_id,mobile,alt_mobile,email,skill,workImg1,profileImg,workImg3,aboutYouself,aboutWork,aboutReference,FBLink,InstaLink,YoutubeLink,jdLink,websiteLink,linkedInLink,reference,userName,password,passcode) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const [resp] = await writePool.query(sql, [data.registrationType.toString(), data.studioName, data.name, data.address, data.location, data.city, data.pin, data.state, data.country, data.phoneNo, data.altPhoneNo, data.email, data.skill, data.workImg1, data.profileImg, data.workImg3, data.aboutYouself, data.aboutWork, data.aboutReference, data.fbLink, data.instaLink, data.youtubeLink, data.jdLink, data.websiteLink, data.linkedInLink, data.reference, data.userName, data.password, data.passcode]);
            return "Registration successful";
        } else {
            let sql = "INSERT INTO users (userType,orgName,name,address,location,city,pin,state_id,country_id,mobile,alt_mobile,email,skill,workImg1,profileImg,workImg3,aboutusImg,reffeedbackImg,aboutYouself,aboutWork,aboutReference,FBLink,InstaLink,YoutubeLink,jdLink,websiteLink,linkedInLink,reference,userName,password) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const [resp] = await writePool.query(sql, [data.registrationType.toString(), data.studioName, data.name, data.address, data.location, data.city, data.pin, data.state, data.country, data.phoneNo, data.altPhoneNo, data.email, data.skill, data.workImg1, data.profileImg, data.workImg3, data.aboutusImg, data.reffeedbackImg, data.aboutYouself, data.aboutWork, data.aboutReference, data.fbLink, data.instaLink, data.youtubeLink, data.jdLink, data.websiteLink, data.linkedInLink, data.reference, data.userName, data.password]);
            return "Registration successful";
        }
    }
    catch (err) {
        logger.error(err);
    }
}