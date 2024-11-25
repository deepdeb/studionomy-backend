const logger = require("../../../config/logger");
const Joi = require('joi');
const myNetworkListService = require("../../services/myNetworkListService");
exports.myNetworkListController = async (req, res) => {
    try {
        const myNetworksData = Joi.object({
            userType: Joi.number().required(),
            userId: Joi.number().required()
        });
        const { error, value } = myNetworksData.validate(req.body);
        if (error) {
            logger.error(`Invalid data for my network list : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for my network list :`);
        const resp = await myNetworkListService.myNetworks(req.body);
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
