const logger = require("../../../config/logger");
const Joi = require('joi');
const selectedEquipmentsForEOBookService = require('../../services/selectedEquipmentsForEOBookService');
exports.selectedEquipmentsForEOBookController = async (req, res) => {
    try {
        const selectedEquipmentsForEOBookData = Joi.object({
            req_id: Joi.required(),
            job_id: Joi.required(),
            job_number: Joi.required(),
            req_to: Joi.required(),
            req_date: Joi.required()
        })
        const { error, value } = selectedEquipmentsForEOBookData.validate(req.body);
        if (error) {
            logger.error(`Invalid selected equipments for eo book data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid selected equipments for eo book data`);
        const resp = await selectedEquipmentsForEOBookService.getSelectedEquipmentsForEOBook(value)
        if(resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        console.log("selected equipments for eo book controller error:", error);
        logger.error("selected equipments for eo book controller error:", res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}