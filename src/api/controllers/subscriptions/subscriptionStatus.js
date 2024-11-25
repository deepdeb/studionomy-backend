const logger = require("../../../config/logger");
const Joi = require('joi');
const subscriptionStatusService = require("../../services/subscriptionStatusService");
exports.subscriptionStatusController = async (req, res) => {
    try {
        const subscriptionStatusCheck = Joi.object({
            subs_id: Joi.number().required(),
            isActive: Joi.number().required()
        });
        const { error, value } = subscriptionStatusCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for subscription status change : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for subscription status change :`);
        const resp = await subscriptionStatusService.subscriptionStatusChange(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};