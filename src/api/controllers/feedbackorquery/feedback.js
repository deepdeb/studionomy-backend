const logger = require("../../../config/logger");
const Joi = require('joi');
const feedbackService = require("../../services/feedbackService");
exports.feedbackController = async (req, res) => {
    try {
        const feedbackData = Joi.object({
            userId: Joi.optional(),
            name: Joi.string().required(),
            mobile: Joi.string().required(),
            alt_mobile: Joi.optional(),
            email: Joi.string().required(),
            profileImg: Joi.string().required(),
            feedback_details: Joi.string().required(),
        });

        const { error, value } = feedbackData.validate(req.body);
        if (error) {
            logger.error(`Invalid feedback data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid feedback data`);
        const resp = await feedbackService.feedback(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "Feedback submitted successfully", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
