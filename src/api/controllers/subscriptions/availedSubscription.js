const logger = require("../../../config/logger");
const Joi = require('joi');
const availedSubscriptionService = require("../../services/availedSubscriptionService");
exports.availedSubscriptionController = async (req, res) => {
    try {
        const availedSubscriptionCheck = Joi.object({
            limit: Joi.number().required(),
            offset: Joi.number().required(),
            searchCondition: Joi.optional()
        });

        const { error, value } = availedSubscriptionCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid availed subscription data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid availed subscription data :`);
        const resp = await availedSubscriptionService.getAvailedSubscriptionList(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp[0], totalSubscription: resp[1] });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};