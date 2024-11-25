const logger = require("../../../config/logger");
const Joi = require('joi');
const joblistService = require("../../services/joblistService");
exports.joblistController = async (req, res) => {
    try {
        const joblistCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            limit: Joi.optional(),
            offset: Joi.optional(),
            jobType: Joi.optional(),
            job_details: Joi.optional(),
            cust_name: Joi.optional(),
            cust_phoneNo: Joi.optional(),
            job_search_criteria: Joi.optional()
        });
        const { error, value } = joblistCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for job list : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for job list :`);
        const resp = await joblistService.getJobList(req.body);
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
