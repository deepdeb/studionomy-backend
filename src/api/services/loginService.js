const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
const authHelpers = require("../utils/authHelpers");
exports.userLogin = async (data) => {
    try {

        // if (data.loginType) {
        //     let sql = "SELECT userId, userName, password FROM admin WHERE userName=? AND isDeleted=0";
        //     var userResp = await readConn.query(sql, [data.userName]);
        // } else {
        //     let sql = "SELECT userId, userName, password, userType FROM users WHERE userName=? AND isDeleted=0";
        //     var userResp = await readConn.query(sql, [data.userName]);
        // }

        // if (userResp.length === 0) {
        //     return null;
        // }

        // const passwordMatch = await authHelpers.comparePasswords(data.password, userResp[0][0].password);
        // if (!passwordMatch) {
        //     return null;
        // }


        // return userResp[0];

        if (data.loginType) {
            let sql = "SELECT userId, userName FROM admin WHERE userName=? AND password=? AND isDeleted=0";
            var userResp = await readConn.query(sql, [data.userName, data.password]);
        } else {
            let sql = "SELECT userId, userName, userType, passcode FROM users WHERE BINARY userName =? AND BINARY password = ? AND isDeleted=0 AND isPermission = 1";
            var userResp = await readConn.query(sql, [data.userName, data.password]);
        }

        if (userResp.length === 0) {
            return null;
        }

        return userResp[0];
    }
    catch (err) {
        console.log("err>>>>", err);
        logger.error(err);
        return false;
    }
}