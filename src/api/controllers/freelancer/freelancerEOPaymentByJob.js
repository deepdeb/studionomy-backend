const logger = require("../../../config/logger");
const Joi = require('joi');
const freelancerEOPaymentByJobService = require('../../services/freelancerEOPaymentByJobService')
exports.getFreelancerEOPaymentByJobController = async (req, res) => {
    try {
        const freelancerEOPaymentByJobDataCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            req_id: Joi.required()
        })

        // Validate the data
        const { error, value } = freelancerEOPaymentByJobDataCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid freelancer eo payment by job data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid freelancer eo payment by job data`);

        const resp = await freelancerEOPaymentByJobService.getFreelancerEOPaymentByJob(value);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.info('freelancer eo payment by job controller error: ', error);
        console.log('freelancer eo payment by job controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}