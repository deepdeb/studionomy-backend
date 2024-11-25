const logger = require("../../../config/logger");
const Joi = require('joi');
const addToMyNetworkService = require("../../services/addToMyNetworkService");
exports.addToMyNetworkController = async (req, res) => {
    try {
        const addToMyNetworkData = Joi.object({
            userType: Joi.number().required(),
            userId: Joi.number().required(),
            myNetworks: Joi.string().required()
        });
        const { error, value } = addToMyNetworkData.validate(req.body);
        if (error) {
            logger.error(`Invalid data for add to my network : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for add to my network :`);
        const resp = await addToMyNetworkService.addToMyNetwork(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
