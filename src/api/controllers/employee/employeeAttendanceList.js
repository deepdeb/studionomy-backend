const logger = require("../../../config/logger");
const Joi = require('joi');
const employeeAttendanceListService = require("../../services/employeeAttendanceListService");
exports.employeeAttendanceListController = async (req, res) => {
    try {
        const employeeAttendanceListCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            emp_id: Joi.optional(),
            year: Joi.optional(),
            month: Joi.optional()
        });
        const { error, value } = employeeAttendanceListCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for employee attendance list : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for employee attendance list :`);
        const resp = await employeeAttendanceListService.getEmployeeAttendanceList(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp[1], totalCount: resp[0] });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
