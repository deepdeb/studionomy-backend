const logger = require("../../../config/logger");
const Joi = require('joi');
const searchuserService = require("../../services/searchuserService");
exports.searchUserController = async (req, res) => {
    try {
        const userSearchCheck = Joi.object({
            userType: Joi.optional(),
            name: Joi.optional(),
            city: Joi.optional(),
            userId: Joi.optional(),
            search_start_date: Joi.optional(),
            search_end_date: Joi.optional(),
            registerType: Joi.optional(),
            search_name: Joi.optional(),
            limit: Joi.number().required(),
            offset: Joi.number().required()
        });
        const { error, value } = userSearchCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for user search : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for user search :`);
        const resp = await searchuserService.getSearchUserList(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp[0], totalUser: resp[1] });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
