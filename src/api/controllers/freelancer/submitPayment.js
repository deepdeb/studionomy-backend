const logger = require("../../../config/logger");
const Joi = require('joi');
const submitPaymentService = require('../../services/submitPaymentService');
exports.submitPaymentController = async (req, res) => {
    try {
        const submitPaymentCheck = Joi.object({
            req_id: Joi.required(),
            job_id: Joi.required(),
            job_number: Joi.required(),
            payment_to: Joi.required(),
            payment_to_userType: Joi.required(),
            payment_from: Joi.required(),
            payment_from_userType: Joi.required(),
            payment_amount: Joi.required()
        })

        // Validate the data
        const { error, value } = submitPaymentCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid submit payment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid submit payment data`);

        const resp = await submitPaymentService.submitPayment(value);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.info('submit payment controller error: ', error);
        console.log('submit payment controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}