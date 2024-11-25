const logger = require("../../../config/logger");
const Joi = require('joi');
const bookingStatusByDatesService = require("../../services/bookingStatusByDatesService");
exports.bookingStatusByDatesController = async (req, res) => {
    try {
        const bookingStatusByDatesData = Joi.object({
            datesToCheck: Joi.required(),
            userId: Joi.required(),
            userType: Joi.required()
        })
        const { error, value } = bookingStatusByDatesData.validate(req.body);
        if(error) {
            logger.error(`Invalid data for booking status by dates : ${error.details[0].message}`);
            return res.json({ success: false, message: error.details[0].message.replace(/["':]/g, '') })
        }
        logger.info(`Valid data for booking status by dates :`);
        const resp = await bookingStatusByDatesService.bookingStatusByDates(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}