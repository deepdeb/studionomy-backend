const readConn = require('../../config/mysql').readPool;
const logger = require("../../config/logger");

exports.searchForNetwork = async (data) => {
    try {
        let sql = "SELECT u.orgName,u.userType,u.userId,u.name,u.address,u.location,u.city,u.pin,u.mobile,u.alt_mobile,u.email,u.workImg1,u.profileImg,u.workImg3,u.aboutYouself,u.aboutWork,u.aboutReference,u.FBLink,u.InstaLink,u.YoutubeLink,u.jdLink,u.websiteLink,u.linkedInLink,u.reference,u.userName,s.state_name,c.country_name,GROUP_CONCAT(i.inv_code SEPARATOR ',') AS inv_code,i.inv_id from state as s,country as c,users as u LEFT JOIN inventary AS i ON i.userId = u.userId where u.userType=? AND u.isDeleted=0 AND s.state_id = u.state_id AND c.country_id = u.country_id AND u.profile_share = 1 AND i.rentout = 1";
        let queryParams = [data.userType];

        if (data.country != null && data.country != "") {
            sql += " AND c.country_id = ?";
            queryParams.push(data.country);
        }
        if (data.state != null && data.state != "") {
            sql += " AND s.state_id = ?";
            queryParams.push(data.state);
        }
        if (data.company != null && data.company != "") {
            sql += " AND b.brand_id = ?";
            queryParams.push(data.company);
        }
        if (data.company != null && data.company != "") {
            sql += " AND i.company = ?";
            queryParams.push(data.company);
        }
        if (data.equipmentCategory != null && data.equipmentCategory != "") {
            sql += " AND i.equ_cate_id = ?";
            queryParams.push(data.equipmentCategory);
        }
        if (data.city != null && data.city != "") {
            sql += " AND u.city LIKE '%" + data.city + "%'";
        }
        if (data.name != null && data.name != "") {
            sql += " AND (u.name LIKE '%" + data.name + "%' OR u.orgName LIKE '%" + data.name + "%')";
        }

        // Count Query
        const countSql = `SELECT COUNT(*) as totalUser FROM (${sql}) AS countTable`;
        const [countResp] = await readConn.query(countSql, queryParams);

        // Main Query
        sql += " GROUP BY u.userId ORDER BY u.userId DESC LIMIT ? OFFSET ?";
        queryParams.push(data.limit, data.offset);
        const [resp2] = await readConn.query(sql, queryParams);
        const totalUser = countResp[0].totalUser || 0;

        return [resp2 || [], totalUser];
    } catch (err) {
        logger.error('search for network service error: ',err);
        console.log('search for network service error: ',err)
        return false;
    }
};
