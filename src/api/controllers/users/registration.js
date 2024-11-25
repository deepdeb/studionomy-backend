const logger = require("../../../config/logger");
const Joi = require('joi');
const registrationService = require("../../services/registrationService");
exports.registrationController = async (req, res) => {
    try {
        const registrationData = Joi.object({
            registrationType: Joi.string().required(),
            studioName: Joi.optional(),
            name: Joi.string().required(),
            address: Joi.string().required(),
            location: Joi.string().required(),
            city: Joi.string().required(),
            pin: Joi.string().length(6).required(),
            country: Joi.number().required(),
            state: Joi.number().required(),
            phoneNo: Joi.string().required(),
            altPhoneNo: Joi.optional(),
            email: Joi.optional(),
            reference: Joi.optional(),
            skill: Joi.optional(),
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
            userName: Joi.string().required(),
            password: Joi.string().required(),
            passcode: Joi.optional()
        });
        const { error, value } = registrationData.validate(req.body);
        if (error) {
            logger.error(`Invalid registration data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for registration`);
        const resp = await registrationService.userRegistration(req.body);
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