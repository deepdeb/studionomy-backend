const logger = require("../../../config/logger");
const Joi = require('joi');
const equipmentSubCategoryService = require("../../services/equipmentSubCategoryService");
exports.equipmentSubCategoryController = async (req, res) => {
    try {
        const equipmentSubCategoryListData = Joi.object({
            equ_cate_id: Joi.string().required()
        });

        const { error, value } = equipmentSubCategoryListData.validate(req.body);
        if (error) {
            logger.error(`Invalid EquipmentSubCategoryList data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid EquipmentSubCategoryList data`);
        const resp = await equipmentSubCategoryService.getEquipmentSubCategoryListById(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: null });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
