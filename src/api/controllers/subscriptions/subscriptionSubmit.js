const logger = require("../../../config/logger");
const Joi = require('joi');
const subscriptionSubmitService = require("../../services/subscriptionSubmitService");
exports.subscriptionSubmitController = async (req, res) => {
    try {
        const subscriptionSubmitData = Joi.object({
            subs_id: Joi.number().required(),
            subs_type: Joi.required(),
            subs_for: Joi.number().required(),
            subs_name: Joi.string().required(),
            amount: Joi.number().required(),
            discount_type: Joi.optional(),
            discount: Joi.optional(),
            final_amount: Joi.required(),
            validity: Joi.optional(),
            no_of_jobs: Joi.optional(),
            created_by: Joi.string().required()
        });

        const { error, value } = subscriptionSubmitData.validate(req.body);
        if (error) {
            logger.error(`Invalid subscription submit data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid subscription submit data`);
        const resp = await subscriptionSubmitService.subscriptionSubmit(req.body);
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
