const logger = require("../../../config/logger");
const Joi = require('joi');
const jobpaymentService = require("../../services/jobpaymentService");
exports.jobPaymentController = async (req, res) => {
    try {
        const jobPaymentCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            job_id: Joi.number().required(),
            job_number: Joi.required(),
            job_value: Joi.required(),
            job_details: Joi.optional(),
            payment_amount: Joi.number().optional(),
            payment_type: Joi.optional(),
            payment_date: Joi.optional(),
            payment_description: Joi.optional()
        });
        const { error, value } = jobPaymentCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for job payment : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for job payment :`);
        const resp = await jobpaymentService.paymentForJob(req.body);
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
