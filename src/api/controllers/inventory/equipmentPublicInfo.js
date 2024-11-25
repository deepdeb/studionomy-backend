const logger = require("../../../config/logger");
const Joi = require('joi');
const equipmentPublicInfoService = require("../../services/equipmentPublicInfoService");
exports.equipmentPublicInfoController = async (req, res) => {
    try {
        const equipmentPublicInfoData = Joi.object({
            userId: Joi.number().required()
        });

        const { error, value } = equipmentPublicInfoData.validate(req.body);
        if (error) {
            logger.error(`Invalid equipment public info data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid equipment public info data`);
        const resp = await equipmentPublicInfoService.getEquipmentPublicInfo(req.body);
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