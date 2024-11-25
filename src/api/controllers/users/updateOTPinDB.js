const logger = require("../../../config/logger");
const Joi = require('joi');
const updateOTPinDBService = require('../../services/updateOTPinDBService')
exports.updateOTPinDBController = async (req, res) => {
    try {
        const updateOTPinDBData = Joi.object({
            userId: Joi.required(),
            generatedOTP: Joi.required()
        });

        const { error, value } = updateOTPinDBData.validate(req.body);
        if (error) {
            logger.error(`Invalid update OTP in DB data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid update OTP in DB data`);
        const resp = await updateOTPinDBService.updateOTPinDB(req.body);
        if (resp.length > 0) {
            return res.json({ success: true, status: 200, message: "", response: resp });
        } else {
            return res.json({ success: false, status: 300, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};