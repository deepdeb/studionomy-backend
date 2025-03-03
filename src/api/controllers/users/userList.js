const logger = require("../../../config/logger");
const Joi = require('joi');
const userListService = require("../../services/userListService");
exports.userlistController = async (req, res) => {
    try {
        const userListCheck = Joi.object({
            userType: Joi.optional(),
            name: Joi.optional(),
            city: Joi.optional(),
            limit: Joi.number().required(),
            offset: Joi.number().required()
        });
        const { error, value } = userListCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for user list : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for user list :`);
        const resp = await userListService.getUserList(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "", response: resp[1], userCount: resp[0] });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        console.log('user list controller error: ', error)
        logger.error('user list controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
