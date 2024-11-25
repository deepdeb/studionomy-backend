const Razorpay = require('razorpay');
const logger = require("../../../config/logger");
const Joi = require('joi');
const crypto = require('crypto');

exports.createorderController = async (req, res) => {
    try {
        const createorderCheck = Joi.object({
            amount: Joi.required(),
            currency: Joi.required(),
            notes: Joi.required()
        })

        const { error, value } = createorderCheck.validate(req.body);
        if(error) {
            logger.error(`Invalid create order data: ${error.details[0].message}`);
            return res.status(400).json({success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid create order data :`);

        const razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_ID_KEY,
            key_secret: process.env.RAZORPAY_SECRET_KEY
        })

        const receipt = `receipt_${crypto.randomBytes(16).toString('hex')}`

        const options = {
            amount: value.amount * 100,
            currency: value.currency,
            receipt: receipt,
            notes: value.notes,
        };

        const order = await razorpayInstance.orders.create(options);
        if(order) {
            return res.json({ success: true, status: 200, message: "", order_id: order.id, amount: order.amount, key_id: razorpayInstance.key_id })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error' })
        }
    } catch (error) {
        logger.error(error.message);
        return res.json({ success: false, status: 400, message: error.message, response: [] });
    }
}

