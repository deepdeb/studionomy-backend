const logger = require("../../../config/logger");
const Joi = require('joi');
const subscriptionlistService = require("../../services/subscriptionlistService");
exports.subscriptionListController = async (req, res) => {
    try {
        const subscriptionlistCheck = Joi.object({
            limit: Joi.optional(),
            offset: Joi.optional(),
            subs_name: Joi.optional()
        });

        const { error, value } = subscriptionlistCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for  subscription list data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for subscription list data :`);
        const resp = await subscriptionlistService.getSubscriptionList(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp[0], totalSubscription: resp[1][0].totalSubscription });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
