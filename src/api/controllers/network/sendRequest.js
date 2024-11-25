const logger = require("../../../config/logger");
const Joi = require('joi');
const sendRequestService = require("../../services/sendRequestService");
exports.sendRequestController = async (req, res) => {
    try {
        const sendRequestData = Joi.object({
            req_id: Joi.optional(),
            job_id: Joi.number().required(),
            job_number: Joi.string().required(),
            event_location: Joi.string().required(),
            payment: Joi.optional(),
            skills: Joi.string().required(),
            message: Joi.optional(),
            req_from: Joi.number().required(),
            req_from_userType: Joi.number().required(),
            req_to: Joi.number().required(),
            req_to_userType: Joi.number().required(),
            selectedDates: Joi.required()
        });

        const { error, value } = sendRequestData.validate(req.body);
        if (error) {
            logger.error(`Invalid send request data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid send request data`);
        const resp = await sendRequestService.sendRequest(req.body);
        if (resp) {
            if(resp.includes("already")) {
                return res.json({success: false, status: 500, message: resp, response: resp})
            }
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
