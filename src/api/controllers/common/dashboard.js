const logger = require("../../../config/logger");
const Joi = require('joi');
const dashboardService = require("../../services/dashboardService");
exports.dashboardController = async (req, res) => {
    try {
        const resp = await dashboardService.dashboardCount(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", totalStudioUser: resp[0], totalFreelancerUser: resp[1], totalEquipmentUser: resp[2], totalSubscription: resp[3] });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
