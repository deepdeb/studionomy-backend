const logger = require("../../../config/logger");
const Joi = require('joi');
const freelancerlistService = require("../../services/freelancerlistService");
exports.freelancerlistController = async (req, res) => {
    try {
        const freelancerlistCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            limit: Joi.optional(),
            offset: Joi.optional(),
            freelancerId: Joi.optional(),
            startDate: Joi.optional(),
            endDate: Joi.optional()
        });
        const { error, value } = freelancerlistCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for freelancer list : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for freelancer list :`);
        const resp = await freelancerlistService.getFreelancerList(req.body);
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
