const logger = require("../../../config/logger");
const Joi = require('joi');
const jobNumberGenService = require("../../services/jobNumberGenService");
exports.jobNoGenController = async (req, res) => {
    try {
        const jobNoGenData = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required()
        });
        const { error, value } = jobNoGenData.validate(req.body);
        if (error) {
            logger.error(`Invalid data for job No generate : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for job No generate :`);
        const resp = await jobNumberGenService.jobNumberGenerate(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
