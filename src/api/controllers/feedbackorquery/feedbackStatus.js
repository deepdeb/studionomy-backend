const logger = require("../../../config/logger");
const Joi = require('joi');
const feedbackStatusService = require("../../services/feedbackStatusService");
exports.feedbackStatusController = async (req, res) => {
    try {
        const feedbackStatusCheck = Joi.object({
            f_id: Joi.number().required(),
            isShow: Joi.number().required()
        });
        const { error, value } = feedbackStatusCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for feedback status change : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for feedback status change :`);
        const resp = await feedbackStatusService.feedbackStatusChange(req.body);
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