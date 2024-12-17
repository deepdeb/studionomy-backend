const logger = require("../../../config/logger");
const Joi = require('joi');
const acceptPaymentService = require('../../services/acceptPaymentService');
exports.acceptPaymentController = async (req, res) => {
    try {
        const acceptPaymentData = Joi.object({
            fl_eo_payment_id: Joi.required(),
            req_id: Joi.required(),
            job_id: Joi.required(),
            job_number: Joi.required(),
            credit_amount: Joi.required()
        })
        const { error, value } = acceptPaymentData.validate(req.body);
        if (error) {
            logger.error(`Invalid accept payment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid accept payment data`);
        const resp = await acceptPaymentService.acceptPayment(value);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.info('accept payment controller error: ', error);
        console.log('accept payment controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}