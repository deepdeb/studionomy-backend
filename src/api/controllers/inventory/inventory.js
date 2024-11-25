const logger = require("../../../config/logger");
const Joi = require('joi');
const inventoryService = require("../../services/inventoryService");
exports.inventoryController = async (req, res) => {
    try {
        const inventoryData = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            inv_id: Joi.number().required(),
            equ_cate_id: Joi.number().required(),
            equ_sub_cate: Joi.string().required(),
            company: Joi.string().required(),
            modelName: Joi.optional(),
            invPrice: Joi.optional(),
            rentout: Joi.number().required(),
            inv_code: Joi.string().required()
        });

        const { error, value } = inventoryData.validate(req.body);
        if (error) {
            logger.error(`Invalid inventory data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid inventory data`);
        const resp = await inventoryService.inventorysubmit(req.body);
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
