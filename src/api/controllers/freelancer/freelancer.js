const logger = require("../../../config/logger");
const Joi = require('joi');
const freelancerService = require("../../services/freelancerService");
exports.freelancerController = async (req, res) => {
    try {
        const freelancerData = Joi.object({
            userId: Joi.required(),
            userType: Joi.required(),
            freelancerId: Joi.optional(),
            freelancerName: Joi.string().required(),
            freelancerPhone: Joi.string().required(),
            freelancerEmail: Joi.optional(),
            freelancerAddr: Joi.string().required(),
            freelancerDateOfJoin: Joi.string().required(),
        });

        const { error, value } = freelancerData.validate(req.body);
        if (error) {
            logger.error(`Invalid freelancer data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid freelancer data`);
        const resp = await freelancerService.freelancerSubmit(req.body);
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
