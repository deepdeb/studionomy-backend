const logger = require("../../../config/logger");
const Joi = require('joi');
const checkAndChangePasswordService = require('../../services/checkAndChangePasswordService');
exports.checkAndChangePasswordController = async (req, res) => {
    try {
        const checkAndChangePasswordData = Joi.object({
            userId: Joi.required(),
            changePasswordOTP: Joi.required(),
            oldPassword: Joi.required(),
            newPassword: Joi.required()
        });

        const { error, value } = checkAndChangePasswordData.validate(req.body);
        if (error) {
            logger.error(`Invalid check and change password data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid check and change password data`);
        const resp = await checkAndChangePasswordService.checkAndChangePassword(req.body);
        if (resp.length > 0) {
            return res.json({ success: true, status: 200, message: resp, response: resp});
        } else {
            return res.json({ success: false, status: 300, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};