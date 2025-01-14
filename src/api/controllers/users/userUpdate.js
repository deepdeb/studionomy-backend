const logger = require("../../../config/logger");
const Joi = require('joi');
const userUpdateService = require("../../services/userUpdateService");
exports.userUpdateController = async (req, res) => {
    try {
        const userUpdateData = Joi.object({
            registrationType: Joi.string().required(),
            userId: Joi.string().required(),
            studioName: Joi.optional(),
            name: Joi.string().required(),
            address: Joi.string().required(),
            location: Joi.string().required(),
            city: Joi.string().required(),
            pin: Joi.string().length(6).required(),
            state: Joi.number().required(),
            country: Joi.number().required(),
            phoneNo: Joi.string().required(),
            altPhoneNo: Joi.optional(),
            email: Joi.string().required(),
            reference: Joi.optional(),
            passcode: Joi.optional(),
            workImg1: Joi.optional(),
            profileImg: Joi.optional(),
            workImg3: Joi.optional(),
            aboutusImg: Joi.optional(),
            reffeedbackImg: Joi.optional(),
            aboutYouself: Joi.optional(),
            aboutWork: Joi.optional(),
            aboutReference: Joi.optional(),
            websiteLink: Joi.optional(),
            fbLink: Joi.optional(),
            instaLink: Joi.optional(),
            youtubeLink: Joi.optional(),
            jdLink: Joi.optional(),
            linkedInLink: Joi.optional(),
            userName: Joi.string().required()
        });
        const { error, value } = userUpdateData.validate(req.body);
        if (error) {
            logger.error(`Invalid user update data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for user update`);
        const resp = await userUpdateService.userUpdate(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    }
    catch (err) {
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};