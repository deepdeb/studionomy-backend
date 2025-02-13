const logger = require("../../../config/logger");
const Joi = require('joi');
const employeeAttendanceByDateService = require("../../services/employeeAttendanceByDateService");
exports.employeeAttendanceByDateController = async (req, res) => {
    try {
        const employeeAttendanceByDateData = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            attnDate: Joi.string().required(),
            emp_id: Joi.required()
        });

        const { error, value } = employeeAttendanceByDateData.validate(req.body);
        if (error) {
            logger.error(`Invalid employee data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid employee data`);
        const resp = await employeeAttendanceByDateService.getemployeeAttendanceByDate(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: '', response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
