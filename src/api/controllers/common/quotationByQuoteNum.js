const logger = require("../../../config/logger");
const Joi = require('joi');
const quotationByQuoteNumService = require('../../services/quotationByQuoteNumService')
exports.quotationByQuoteNumController = async (req, res) => {
    try {
        const quotationByQuoteNumData = Joi.object({
            quotation_id: Joi.required(),
            userId: Joi.required(),
            userType: Joi.required()
        })
        const { error, value } = quotationByQuoteNumData.validate(req.body);
        if (error) {
            logger.error(`Invalid quotation data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid quotation data`);
        const resp = await quotationByQuoteNumService.quotationByQuoteNum(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
} 