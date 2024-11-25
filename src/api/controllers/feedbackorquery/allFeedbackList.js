const logger = require("../../../config/logger");
const Joi = require('joi');
const feedbackListAllService = require("../../services/feedbackListAllService");
exports.AllFeedbackListController = async (req, res) => {
    try {
        const feedbacklistCheck = Joi.object({
            limit: Joi.optional(),
            offset: Joi.optional(),
            name: Joi.optional()
        });
        const { error, value } = feedbacklistCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for feedback list : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for feedback list :`);
        const resp = await feedbackListAllService.getAllFeedbackList(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp[0], totalFeedback: resp[1] });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};