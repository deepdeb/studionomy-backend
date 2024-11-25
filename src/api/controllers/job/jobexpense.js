const logger = require("../../../config/logger");
const Joi = require('joi');
const jobexpenseService = require("../../services/jobexpenseService");
exports.jobExpenseController = async (req, res) => {
    try {
        const jobExpenseCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            job_id: Joi.number().required(),
            job_number: Joi.required(),
            job_value: Joi.required(),
            job_details: Joi.required(),
            exp_payment_date: Joi.required(),
            exp_payment_type: Joi.required(),
            exp_payment_description: Joi.required(),
            exp_payment_amount: Joi.required()
        });
        const { error, value } = jobExpenseCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for job expense : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for job expense :`);
        const resp = await jobexpenseService.expenseForJob(req.body);
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
