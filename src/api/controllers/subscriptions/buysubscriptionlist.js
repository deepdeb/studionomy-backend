const logger = require("../../../config/logger");
const Joi = require('joi');
const buysubscriptionlistService = require("../../services/buysubscriptionlistService");
exports.buysubscriptionlistController = async (req, res) => {
    try {
        const buysubscriptionlistCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.optional(),
            limit: Joi.number().required(),
            offset: Joi.number().required()
        });

        const { error, value } = buysubscriptionlistCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid buy subscription list data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid buy subscription list data :`);
        const resp = await buysubscriptionlistService.getbuySubscriptionList(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp[0], main_jobs_remaining: resp[1] ? resp[1] : 0 });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
