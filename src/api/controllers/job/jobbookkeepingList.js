const logger = require("../../../config/logger");
const Joi = require('joi');
const jobbookkeepinglistService = require("../../services/jobbookkeepinglistService");
exports.jobbookkeepingListController = async (req, res) => {
    try {
        const jobbookkeepinglistCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            limit: Joi.number().required(),
            offset: Joi.number().required(),
            startDate: Joi.optional(),
            endDate: Joi.optional(),
            job_number: Joi.optional(),
            payment_criteria: Joi.optional()
        });
        const { error, value } = jobbookkeepinglistCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for bookkeeping list : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for bookkeeping list :`);
        const resp = await jobbookkeepinglistService.getAllJobBookkeepingList(req.body);
        //console.log(resp)
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
