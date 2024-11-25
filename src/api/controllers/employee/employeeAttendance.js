const logger = require("../../../config/logger");
const Joi = require('joi');
const employeeAttendanceService = require("../../services/employeeAttendanceService");
exports.employeeAttendanceController = async (req, res) => {
    try {
        const employeeAttendanceData = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            empAttn_id: Joi.optional(),
            attnDate: Joi.string().required(),
            empAttnArrar: Joi.array().optional(),
            emp_id: Joi.optional(),     
            empRemarks: Joi.optional(),
            empOutdoorHours: Joi.optional(),
            empAttendance: Joi.optional()
        });

        const { error, value } = employeeAttendanceData.validate(req.body);
        if (error) {
            logger.error(`Invalid employee attendance data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid employee attendance data`);
        const resp = await employeeAttendanceService.employeeAttendanceSubmit(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
