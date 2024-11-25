const logger = require("../../../config/logger");
const Joi = require('joi');

exports.getFreelancerPaymentController = async (req, res) => {
    try {
        const freelancerPaymentDataCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
        })

        // Validate the data
        const { error, value } = freelancerPaymentDataCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid freelancer payment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid freelancer payment data`);

        const resp = await freelancerPaymentService.getFreelancerPayment(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp[1], totalCount: resp[0] });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.info('freelancer payment controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}