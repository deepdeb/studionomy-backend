const logger = require("../../../config/logger");
const Joi = require('joi');
const freelancerRequestService = require('../../services/freelancerRequestService');
exports.getFreelancerRequestController = async (req, res) => {
    try {
        const freelancerRequestDataCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
        })

        // Validate the data
        const { error, value } = freelancerRequestDataCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid freelancer Request data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid freelancer Request data`);

        const resp = await freelancerRequestService.getFreelancerRequest(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp[0], totalCount: resp[1] });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.info('freelancer Request controller error: ', error);
        console.log('freelancer Request controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}