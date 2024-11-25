const logger = require("../../../config/logger");
const Joi = require('joi');
const feedbacklistService = require("../../services/feedbacklistService");
exports.ApprovedFeedbackListController = async (req, res) => {
    try {
        const resp = await feedbacklistService.getAllApprovedFeedbackList();
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error" });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};

