const logger = require("../../../config/logger");
const Joi = require('joi');
const buysubscriptionService = require("../../services/buysubscriptionService");
exports.buysubscriptionController = async (req, res) => {
    try {
        const buysubscriptionCheck = Joi.object({
            no_of_jobs: Joi.number().required(),
            subs_for: Joi.required(),
            subs_id: Joi.required(),
            subs_type: Joi.required(),
            validity: Joi.required(),
            final_amount: Joi.required(),
            transaction_id: Joi.required(),
            response_code: Joi.required(),
            userId: Joi.required(),
            userType: Joi.required()
        });

        const { error, value } = buysubscriptionCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid buy subscription data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid buy subscription data :`);
        const resp = await buysubscriptionService.buySubscription(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        console.log('error: ', error);
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
