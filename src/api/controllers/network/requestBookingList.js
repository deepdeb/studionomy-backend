const logger = require("../../../config/logger");
const Joi = require('joi');
const requestBookingListService = require("../../services/requestBookingListService");
exports.requestBookingListController = async (req, res) => {
    try {
        const requestBookingListData = Joi.object({
            req_to: Joi.number().required(),
            req_to_userType: Joi.number().required()
        });
        const { error, value } = requestBookingListData.validate(req.body);
        if (error) {
            logger.error(`Invalid data for request booking list : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for request booking list :`);
        const resp = await requestBookingListService.requestBookingList(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
