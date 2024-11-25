const readConn = require('../../config/mysql').readPool
const { error } = require('winston');
const logger = require("../../config/logger");
exports.getSearchUserList = async (data) => {
    try {
        if (data.userType != null && data.city == null && data.name == null) {
            let sql = "SELECT u.orgName,u.userType,u.userId,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.userType=? AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id AND u.profile_share = 1 ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            var [resp2] = await readConn.query(sql, [data.userType, data.limit, data.offset]);
        }
        if (data.userType != null && data.city != null && data.name == null) {
            let sql = "SELECT u.orgName,u.userType,u.userId,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.userType=? AND u.city LIKE '%%" + data.city + "%%' AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id AND u.profile_share = 1 ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            var [resp2] = await readConn.query(sql, [data.userType, data.limit, data.offset]);
        }
        if (data.userType != null && data.city != null && data.name != null) {
            if (data.userType == 0) {
                var sql = "SELECT u.orgName,u.userType,u.userId,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.userType=? AND u.city LIKE '%%" + data.city + "%%' AND u.orgName LIKE '%%" + data.name + "%%' AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id AND u.profile_share = 1 ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            } else {
                var sql = "SELECT u.orgName,u.userType,u.userId,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.userType=? AND u.city LIKE '%%" + data.city + "%%' AND u.name LIKE '%%" + data.name + "%%' AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id AND u.profile_share = 1 ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            }
            var [resp2] = await readConn.query(sql, [data.userType, data.limit, data.offset]);
        }
        if (data.userType == null && data.city != null && data.name == null) {
            let sql = "SELECT u.orgName,u.userType,u.userId,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.city LIKE '%%" + data.city + "%%' AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id AND u.profile_share = 1 ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            var [resp2] = await readConn.query(sql, [data.limit, data.offset]);
        }
        if (data.userType != null && data.city == null && data.name != null) {
            if (data.userType == 0) {
                var sql = "SELECT u.orgName,u.userType,u.userId,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.userType=? AND u.orgName LIKE '%%" + data.name + "%%' AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            } else {
                var sql = "SELECT u.orgName,u.userType,u.userId,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name from users as u,state as s,country as c where u.userType=? AND u.name LIKE '%%" + data.name + "%%' AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id ORDER BY u.userId DESC LIMIT ? OFFSET ?"
            }
            var [resp2] = await readConn.query(sql, [data.userType, data.limit, data.offset]);
        }
        data.name = data.name ? data.name : "";
        data.city = data.city ? data.city : "";
        if (data.userType && data.userType == 0) {
            var countSql = "SELECT COUNT(userId) as totalUser FROM users WHERE isDeleted=0 AND profile_share = 1 AND userType = " + data.userType + " AND orgName LIKE '%%" + data.name + "%%' AND city LIKE '%%" + data.city + "%%'"
        } else if (data.userType && data.userType != 0) {
            var countSql = "SELECT COUNT(userId) as totalUser FROM users WHERE isDeleted=0 AND profile_share = 1 AND userType = " + data.userType + " AND name LIKE '%%" + data.name + "%%' AND city LIKE '%%" + data.city + "%%'"
        } else {
            var countSql = "SELECT COUNT(userId) as totalUser FROM users WHERE isDeleted=0 AND profile_share = 1 AND name LIKE '%%" + data.name + "%%' OR orgName LIKE '%%" + data.name + "%%' AND city LIKE '%%" + data.city + "%%'"
        }
        var [countResp] = await readConn.query(countSql);
        let resp = []
        resp.push(resp2 ? resp2 : []);
        resp.push(countResp ? countResp[0].totalUser : 0)
        return resp ? resp : [];
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}
