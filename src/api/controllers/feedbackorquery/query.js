const logger = require("../../../config/logger");
const Joi = require('joi');
const queryService = require("../../services/queryService");
exports.queryController = async (req, res) => {
    try {
        const queryData = Joi.object({
            userId: Joi.optional(),
            name: Joi.string().required(),
            mobile: Joi.string().required(),
            alt_mobile: Joi.optional(),
            email: Joi.string().required(),
            querie_details: Joi.string().required(),
        });

        const { error, value } = queryData.validate(req.body);
        if (error) {
            logger.error(`Invalid query data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid query data`);
        const resp = await queryService.query(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "Query submitted successfully", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
