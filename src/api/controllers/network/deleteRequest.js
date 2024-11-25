const logger = require("../../../config/logger");
const Joi = require('joi');
const deleteRequestService = require("../../services/deleteRequestService")
exports.deleteRequestController = async (req, res) => {
    try {
        const deleteRequestData = Joi.object({
            req_date: Joi.required(),
            req_to: Joi.required(),
            req_id: Joi.required(),
            req_to_userType: Joi.required(),
            job_id: Joi.required(),
            job_number: Joi.required(),
            userId: Joi.required(),
            userType: Joi.required()
        })

        const { error, value } = deleteRequestData.validate(req.body);
        if (error) {
            logger.error(`Invalid delete request data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        if(value.userId == 5) {
            return res.json({ status: 403, success: false, message: 'Permission denied' });
        } 
        logger.info(`Valid delete request data`);
        const resp = await deleteRequestService.deleteRequest(req.body)
        if(resp){
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}