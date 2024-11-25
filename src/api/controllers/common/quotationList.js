const logger = require("../../../config/logger");
const Joi = require('joi');
const quotationlistService = require("../../services/quotationlistService");
exports.quotationlistController = async (req, res) => {
    try {
        const quotationlistCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            limit: Joi.optional(),
            offset: Joi.optional(),
            quotationType: Joi.optional(),
            quotation_number: Joi.optional(),
            cust_name: Joi.optional(),
            cust_phoneNo: Joi.optional(),
            quote_search_criteria: Joi.optional()
        });
        const { error, value } = quotationlistCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for quotation list : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for quotation list :`);
        const resp = await quotationlistService.getQuotationList(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp[1], totalCount: resp[0] });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
