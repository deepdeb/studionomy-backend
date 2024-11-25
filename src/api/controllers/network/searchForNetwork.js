const logger = require("../../../config/logger");
const Joi = require('joi');
const searchForNetworkService = require("../../services/searchForNetworkService");
exports.searchForNetworkController = async (req, res) => {
    try {
        const searchForNetworkCheck = Joi.object({
            userType: Joi.number().required(),
            country: Joi.optional(),
            state: Joi.optional(),
            city: Joi.optional(),
            skill: Joi.optional(),
            equipmentCategory: Joi.optional(),
            company: Joi.optional(),
            name: Joi.optional(),
            id: Joi.optional(),
            date: Joi.optional(),
            limit: Joi.number().required(),
            offset: Joi.number().required()
        });
        const { error, value } = searchForNetworkCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for network search : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for network search :`);
        const resp = await searchForNetworkService.searchForNetwork(req.body);
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
