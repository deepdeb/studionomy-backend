const logger = require("../../../config/logger");
const Joi = require('joi');
const bookkeepingsubmitService = require("../../services/bookkeepingsubmitService");
exports.bookkeepingSubmitController = async (req, res) => {
    try {
        const bookkeepingsubmitCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            b_id: Joi.number().optional(),
            book_date: Joi.string().required(),
            b_description: Joi.string().required(),
            debit_amount: Joi.optional(),
            debit_mode: Joi.optional(),
            credit_amount: Joi.optional(),
            credit_mode: Joi.optional(),
            closing_balance: Joi.required(),
            remarks: Joi.optional()
        });
        const { error, value } = bookkeepingsubmitCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for bookkeeping submit : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for bookkeeping submit :`);
        const resp = await bookkeepingsubmitService.bookkeepingSubmit(req.body);
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
