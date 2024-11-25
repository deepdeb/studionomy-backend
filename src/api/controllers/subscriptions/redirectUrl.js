const logger = require("../../../config/logger");
const axios = require("axios");
const sha256 = require('sha256');

exports.redirectUrlController = async (req, res) => {
    try {
        const PHONEPE_HOST_URL = "https://api.phonepe.com/apis/hermes";
        const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
        const SALT_KEY = process.env.SALT_KEY;
        const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
        const statusEndPoint = "/pg/v1/status";
        const { merchantTransactionId } = req.params;
        const xVerify = sha256(`${statusEndPoint}/${MERCHANT_ID}/${merchantTransactionId}` + SALT_KEY) + "###" + SALT_INDEX;

        if(merchantTransactionId) {
            const options = {
                method: "get",
                url: `${PHONEPE_HOST_URL}${statusEndPoint}/${MERCHANT_ID}/${merchantTransactionId}`,
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    "X-MERCHANT-ID": MERCHANT_ID,
                    "X-VERIFY": xVerify
                },
            };
            
            axios.request(options).then(function (response) {
                const queryParams = new URLSearchParams(response.data.data).toString();
                res.redirect(`https://studionomy.com/#/payment-success?${queryParams}`);
            })
            .catch(function (error) {
                console.error(error);
            })
        } 
    } catch (error) {
        logger.error(error.message);
        return res.json({ success: false, status: 400, message: error.message, response: [] });
    }
}