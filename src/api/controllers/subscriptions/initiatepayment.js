const logger = require("../../../config/logger");
const Joi = require('joi');
const crypto = require('crypto');
const sha256 = require('sha256');
const axios = require('axios');

exports.initiatepaymentController = async (req, res) => {
    try {
        const initiatepaymentCheck = Joi.object({
            amount: Joi.required(),
            mobile: Joi.required()
        })

        const { error, value } = initiatepaymentCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid initiate payment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid initiate payment data :`);

        const PHONEPE_HOST_URL = "https://api.phonepe.com/apis/hermes";
        const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
        const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
        const SALT_KEY = process.env.SALT_KEY;
        const payEndPoint = "/pg/v1/pay";
        const merchantTransactionId = crypto.randomBytes(16).toString('hex');
        const userId = "MUID123"

        const payLoad = {
            merchantId: MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: userId,
            amount: value.amount * 100,
            redirectUrl: `https://studionomy.com/v1/subscription/redirect-url/${merchantTransactionId}`,
            redirectMode: "REDIRECT",
            mobileNumber: value.mobile,
            paymentInstrument: {
                "type": "PAY_PAGE"
            },
        };

        const bufferObj = Buffer.from(JSON.stringify(payLoad), "utf-8");
        const base64EncodedPayload = bufferObj.toString("base64");
        const xVerify = sha256(base64EncodedPayload + payEndPoint + SALT_KEY) + "###" + SALT_INDEX;

        const options = {
            method: "post",
            url: `${PHONEPE_HOST_URL}${payEndPoint}`,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": xVerify
            },
            data: {
                request: base64EncodedPayload
            }
        }

        axios.request(options).then(function (response) {
            console.log('Payment API Response: ', response.data.data.instrumentResponse.redirectInfo.url)
            const url = response.data.data.instrumentResponse.redirectInfo.url
            res.status(200).send({url});
        }).catch (function (error) {
            console.error('Payment API Error: ', error.message);
        })
    } catch (error) {
        logger.error(error.message);
        return res.json({ success: false, status: 400, message: error.message, response: [] });
    }
}