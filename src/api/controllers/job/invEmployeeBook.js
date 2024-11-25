const logger = require("../../../config/logger");
const Joi = require('joi');
const invEmployeeBookService = require("../../services/invEmployeeBookService");
exports.invEmployeeBookController = async (req, res) => {
    try {
        const invEmployeeData = Joi.object({
            job_id: Joi.optional(),
            job_number: Joi.required(),
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            bookingDate: Joi.required(),
            equipments: Joi.optional(),
            employees: Joi.optional()
        });

        const { error, value } = invEmployeeData.validate(req.body);
        if (error) {
            logger.error(`Invalid inv&Employee data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid inv&Employee data`);
        const resp = await invEmployeeBookService.invEmployeeBook(req.body);
        if (resp) {
            return res.json({success: true, status: 200, message: resp, response: resp})
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        //console.log("error>>", error);
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
