const logger = require("../../../config/logger");
const Joi = require('joi');
const setSubscriptionActiveStatusService = require("../../services/setSubscriptionActiveStatusService");
exports.setSubscriptionActiveStatusController = async (req, res) => {
  try {
    const resp = await setSubscriptionActiveStatusService.setSubscriptionActiveStatus();
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