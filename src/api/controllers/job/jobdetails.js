const logger = require("../../../config/logger");
const Joi = require('joi');
const jobDetailsService = require("../../services/jobDetailsService");
exports.jobdetailsController = async (req, res) => {
    try {
        const jobdetailsCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            job_id: Joi.number().required(),
            job_number: Joi.optional()
        });
        const { error, value } = jobdetailsCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for job details : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        //console.log("req.body>>.",req.body);
        logger.info(`Valid data for job details :`);
        const resp = await jobDetailsService.jobDetails(req.body);
        //console.log("resp>>>",resp);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp[0], equipments: resp[1] ? resp[1] : [], employees: resp[2] ? resp[2] : [] });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        console.log("error controller",error);
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
