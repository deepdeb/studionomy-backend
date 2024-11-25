const logger = require("../../../config/logger");
const Joi = require('joi');
const myReqBookingListService = require("../../services/myReqBookingListService");
exports.myReqBookingListController = async (req, res) => {
    try {
        const myReqBookingListData = Joi.object({
            req_from: Joi.number().required(),
            req_from_userType: Joi.number().required()
        });
        const { error, value } = myReqBookingListData.validate(req.body);
        if (error) {
            logger.error(`Invalid data for my request booking list : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for my request booking list :`);
        const resp = await myReqBookingListService.myRequestBookingList(req.body);
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
