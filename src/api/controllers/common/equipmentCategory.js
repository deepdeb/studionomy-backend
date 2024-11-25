const logger = require("../../../config/logger");
const equipmentCategoryService = require("../../services/equipmentCategoryService");
exports.equipmentCategoryController = async (req, res) => {
    try {
        const resp = await equipmentCategoryService.getAllEquipmentCategoryList();
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
