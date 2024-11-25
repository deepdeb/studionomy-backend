const logger = require("../../../config/logger");
const Joi = require('joi');
const commondeleteService = require("../../services/commondeleteService");
exports.commonDeleteController = async (req, res) => {
    try {
        const commonDeleteData = Joi.object({
            id: Joi.number().required(),
            table_name: Joi.string().required(),
            table_pId: Joi.string().required(),
            userId: Joi.string().required(),
            userType: Joi.optional()
        });

        const { error, value } = commonDeleteData.validate(req.body);
        if (error) {
            logger.error(`Invalid ${req.body.table_name} delete data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        if(value.userId == 5) {
            return res.json({ status: 403, success: false, message: 'Permission denied'});
        }
        logger.info(`Valid ${req.body.table_name} delete data`);
        const resp = await commondeleteService.commonDelete(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: null });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
