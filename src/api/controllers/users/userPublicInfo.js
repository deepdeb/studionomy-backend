const logger = require("../../../config/logger");
const Joi = require('joi');
const userPublicInfoService = require("../../services/userPublicInfoService");

exports.userPublicInfoController = async (req, res) => {
    try {
        const userPublicInfoData = Joi.object({
            userId: Joi.number().required()
        })
        const { error, value } = userPublicInfoData.validate(req.body);
        if (error) {
            logger.error(`Invalid user public info data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid userId`);
        const resp = await userPublicInfoService.userPublicInfo(req.body);
        if (resp.length > 0) {
            return res.json({ success: true, status: 200, message: "", response: resp });
        } else {
            return res.json({ success: false, status: 300, message: "No Data Found", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        console.log('userPubliInfo Controller Error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}