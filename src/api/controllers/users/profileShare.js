const logger = require("../../../config/logger");
const Joi = require('joi');
const profileshareService = require("../../services/profileshareService");
exports.profileShareController = async (req, res) => {
    try {
        const profileShareData = Joi.object({
            userId: Joi.number().required(),
            profile_share: Joi.number().required()
        });

        const { error, value } = profileShareData.validate(req.body);
        if (error) {
            logger.error(`Invalid profile Share Data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid profile Share Data`);
        const resp = await profileshareService.profileShare(req.body);
        if (resp.length > 0) {
            return res.json({ success: true, status: 200, message: "Your profile status change successfully", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
