const logger = require("../../../config/logger");
const Joi = require('joi');
const userDetailsService = require("../../services/userDetailsService");
exports.userDetailsController = async (req, res) => {
    try {
        const userData = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required()
        });

        const { error, value } = userData.validate(req.body);
        if (error) {
            logger.error(`Invalid userId : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid userId`);
        const resp = await userDetailsService.userDetails(req.body);
        if (resp.length > 0) {
            return res.json({ success: true, status: 200, message: "", response: resp });
        } else {
            return res.json({ success: false, status: 300, message: "No Data Found", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
