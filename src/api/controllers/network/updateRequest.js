const logger = require("../../../config/logger");
const Joi = require('joi');
const updateRequestService = require("../../services/updateRequestService");
exports.updateRequestController = async (req, res) => {
    try {
        const updateRequestData = Joi.object({
            req_id: Joi.required(),
            reqType: Joi.required(),
            buy_subs_id: Joi.optional(),
            userId: Joi.optional(),
            userType: Joi.optional()
        });

        const { error, value } = updateRequestData.validate(req.body);
        if (error) {
            logger.error(`Invalid update request data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid update request data`);
        const resp = await updateRequestService.updateRequest(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        console.log("error>>", error);
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
