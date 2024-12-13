const logger = require("../../../config/logger");
const Joi = require('joi');
const sendRequestForEOService = require('../../services/sendRequestForEOService');
exports.sendRequestForEOController = async (req, res) => {
    try {
        const sendRequestForEOData = Joi.object({
            req_id: Joi.optional(),
            job_id: Joi.number().required(),
            job_number: Joi.string().required(),
            event_location: Joi.string().required(),
            payment: Joi.optional(),
            equipment_booking_details: Joi.required(),
            message: Joi.optional(),
            req_from: Joi.number().required(),
            req_from_userType: Joi.number().required(),
            req_to: Joi.number().required(),
            req_to_userType: Joi.number().required()
        });

        const { error, value } = sendRequestForEOData.validate(req.body);
        if (error) {
            logger.error(`Invalid send request for EO data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid send request for EO data`);
        const resp = await sendRequestForEOService.sendRequestForEO(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        console.log("send request for EO controller error: ", error);
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
