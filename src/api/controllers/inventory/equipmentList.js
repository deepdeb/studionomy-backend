const logger = require("../../../config/logger");
const Joi = require('joi');
const equipmentListService = require("../../services/equipmentListService");
exports.equipmentListController = async (req, res) => {
    try {
        const equipmentListData = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            limit: Joi.number().required(),
            offset: Joi.number().required()
        });

        const { error, value } = equipmentListData.validate(req.body);
        if (error) {
            logger.error(`Invalid equipment list data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid equipment list data`);
        const resp = await equipmentListService.getEquipmentList(req.body);
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
