const logger = require("../../../config/logger");
const Joi = require('joi');
const selectedDatesForFLBookService = require('../../services/selectedDatesForFLBookService');
exports.selectedDatesForFLBookController = async (req, res) => {
    try {
        const selectedDatesForFLBookData = Joi.object({
            job_id: Joi.required(),
            job_number: Joi.required(),
            req_to: Joi.required()
        })
        const { error, value } = selectedDatesForFLBookData.validate(req.body);
        if (error) {
            logger.error(`Invalid selected dates for fl Book data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid selected dates for fl Book data`);
        const resp = await selectedDatesForFLBookService.getSelectedDatesForFLBook(value)
        if(resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        console.log("selected dates for fl book controller error:", error);
        logger.error("selected dates for fl book controller error:", res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}