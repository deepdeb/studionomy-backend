const logger = require("../../../config/logger");
const Joi = require('joi');
const equipmentListForBookService = require("../../services/equipmentListForBookService")
exports.equipmentListForBookController = async (req, res) => {
    try {
        const equipmentListForBookData = Joi.object({
            req_to: Joi.number().required(),
            req_to_userType: Joi.number().required(),
        });

        const { error, value } = equipmentListForBookData.validate(req.body);
        if (error) {
            logger.error(`Invalid equipment list for book data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid equipment list for book data`);
        const resp = await equipmentListForBookService.getEquipmentListForBook(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        console.log('equipment list for book controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
