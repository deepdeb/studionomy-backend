const logger = require("../../../config/logger");
const Joi = require('joi');
const updatePasswordService = require('../../services/updatePasswordService');
exports.updatePasswordController = async(req, res) => {
    try {
        const updatePasswordData = Joi.object({
            changePassword: Joi.required(),
            toRegisteredMail: Joi.required()
        });
        
        const {error, value} = updatePasswordData.validate(req.body)
        if (error) {
            logger.error(`Invalid update password Data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid profile Share Data`);
        const resp = await updatePasswordService.updatePassword(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}