const logger = require("../../../config/logger");
const Joi = require('joi');
const equipmentTableRemoveService = require("../../services/equipmentTableRemoveService");
exports.equipmentTableRemoveController = async (req, res) => {
    try {
        const equipmentTableDetailsCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            job_id: Joi.number().required(),
            job_number: Joi.required(),
            bookingDate: Joi.required(),
            inv_id: Joi.required(),
            emp_id: Joi.required(),
            itemType: Joi.optional()
        });
        const { error, value } = equipmentTableDetailsCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for equipment details data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for equipment details data :`);
        const resp = await equipmentTableRemoveService.equipmentTableRemove(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        console.log(error)
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};