const logger = require("../../../config/logger");
const Joi = require('joi');
const employeelistService = require("../../services/employeelistService");
exports.employeelistController = async (req, res) => {
    try {
        const employeelistCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            limit: Joi.optional(),
            offset: Joi.optional(),
            emp_id: Joi.optional(),
            startDate: Joi.optional(),
            endDate: Joi.optional()
        });
        const { error, value } = employeelistCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for employee list : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for employee list :`);
        const resp = await employeelistService.getEmployeeList(req.body);
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
