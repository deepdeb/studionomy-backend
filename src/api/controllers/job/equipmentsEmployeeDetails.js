const logger = require("../../../config/logger");
const Joi = require('joi');
const equipmentsEmployeeService = require("../../services/equipmentsEmployeeService");
exports.equipmentsEmployeeDetailsController = async (req, res) => {
    try {
        const equipmentsEmployeeDetailsData = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            job_id: Joi.number().required(),
            job_number: Joi.required()
        });
        const { error, value } = equipmentsEmployeeDetailsData.validate(req.body);
        if (error) {
            logger.error(`Invalid data for equipments and employee details data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for equipments and employee details data :`);
        const resp = await equipmentsEmployeeService.getEquipmentEmployeeList(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
