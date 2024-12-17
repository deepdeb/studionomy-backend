const logger = require("../../../config/logger");
const Joi = require('joi');
const rejectPaymentService = require('../../services/rejectPaymentService');
exports.rejectPaymentController = async (req, res) => {
    try {
        const rejectPaymentData = Joi.object({
            fl_eo_payment_id: Joi.required(),
            reject_remarks: Joi.required()
        })
        const { error, value } = rejectPaymentData.validate(req.body);
        if (error) {
            logger.error(`Invalid reject payment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid reject payment data`);
        const resp = await rejectPaymentService.rejectPayment(value);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.info('reject payment controller error: ', error);
        console.log('reject payment controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}