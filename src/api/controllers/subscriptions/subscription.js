const logger = require("../../../config/logger");
const Joi = require('joi');
const subscriptionService = require("../../services/subscriptionService");
exports.subscriptionController = async (req, res) => {
  try {
    const subscriptionCheck = Joi.object({
      subs_for: Joi.number().required(),
    });

    const { error, value } = subscriptionCheck.validate(req.body);
    if (error) {
      logger.error(`Invalid subscription type : ${error.details[0].message}`);
      return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
    }
    logger.info(`Valid subscription type :`);
    const resp = await subscriptionService.getSubscriptionList(req.body);
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
