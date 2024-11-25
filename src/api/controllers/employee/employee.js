const logger = require("../../../config/logger");
const Joi = require('joi');
const employeeService = require("../../services/employeeService");
exports.employeeController = async (req, res) => {
    try {
        const employeeData = Joi.object({
            userId: Joi.required(),
            userType: Joi.required(),
            emp_id: Joi.optional(),
            empName: Joi.string().required(),
            empPhone: Joi.string().required(),
            empAltPhone: Joi.optional(),
            empEmail: Joi.optional(),
            empAddr: Joi.string().required(),
            empDateOfJoin: Joi.string().required(),
        });

        const { error, value } = employeeData.validate(req.body);
        if (error) {
            logger.error(`Invalid employee data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid employee data`);
        const resp = await employeeService.employeeSubmit(req.body);
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
