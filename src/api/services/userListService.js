const readConn = require('../../config/mysql').readPool
const { error } = require('winston');
const logger = require("../../config/logger");
exports.getUserList = async (data) => {
    try {
        let sqlcount = "SELECT COUNT(userId) as userCount from users where userType=? AND isDeleted=0"
        const [resp1] = await readConn.query(sqlcount, [data.userType]);
        if (data.userType != null && data.city == null && data.name == null) {
            let sql = "SELECT u.orgName,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.userType=? AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            var [resp2] = await readConn.query(sql, [data.userType, data.limit, data.offset]);
        }
        if (data.userType != null && data.city != null && data.name == null) {
            let sql = "SELECT u.orgName,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.userType=? AND u.city LIKE '%%" + data.city + "%%' AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            var [resp2] = await readConn.query(sql, [data.userType, data.limit, data.offset]);
        }
        if (data.userType != null && data.city != null && data.name != null) {
            if (data.userType == 0) {
                var sql = "SELECT u.orgName,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.userType=? AND u.city LIKE '%%" + data.city + "%%' AND u.orgName LIKE '%%" + data.name + "%%' AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            } else {
                var sql = "SELECT u.orgName,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.userType=? AND u.city LIKE '%%" + data.city + "%%' AND u.name LIKE '%%" + data.name + "%%' AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            }
            var [resp2] = await readConn.query(sql, [data.userType, data.limit, data.offset]);
        }
        if (data.userType == null && data.city != null && data.name == null) {
            let sql = "SELECT u.orgName,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.city LIKE '%%" + data.city + "%%' AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            var [resp2] = await readConn.query(sql, [data.limit, data.offset]);
        }
        if (data.userType != null && data.city == null && data.name != null) {
            if (data.userType == 0) {
                var sql = "SELECT u.orgName,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.userType=? AND u.orgName LIKE '%%" + data.name + "%%' AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            } else {
                var sql = "SELECT u.orgName,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.userType=? AND u.name LIKE '%%" + data.name + "%%' AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            }
            var [resp2] = await readConn.query(sql, [data.userType, data.limit, data.offset]);
        }

        let resp = [];
        resp.push(resp1[0].userCount);
        resp.push(resp2);

        return resp ? resp : [];
    }
    catch (err) {
        console.log('user list service error: ', err)
        logger.error('user list service error: ', err);
        return false;
    }
}