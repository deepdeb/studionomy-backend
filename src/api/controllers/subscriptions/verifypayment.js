const logger = require("../../../config/logger");
const Joi = require('joi');
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');

exports.verifypaymentController = async (req, res) => {
    try {
        const verifypaymentCheck = Joi.object({
            razorpay_order_id: Joi.required(),
            razorpay_payment_id: Joi.required(),
            razorpay_signature: Joi.required()
        })

        const { error, value } = verifypaymentCheck.validate(req.body);
        if(error) {
            logger.error(`Invalid verify payment data: ${error.details[0].message}`);
            return res.status(400).json({success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid verify payment data :`);

        const secret = process.env.RAZORPAY_SECRET_KEY;
        const body = value.razorpay_order_id + '|' + value.razorpay_payment_id;

        const isValidSignature = validateWebhookSignature(body, value.razorpay_signature, secret);
        if(isValidSignature) {
            return res.json({ success: true, status: 200, message: "Payment verification successful", response: isValidSignature})
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error' })
        }
    } catch (error) {
        logger.error(error.message);
        return res.json({ success: false, status: 400, message: error.message, response: [] });
    }
}