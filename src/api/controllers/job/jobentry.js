const logger = require("../../../config/logger");
const Joi = require('joi');
const jobentryService = require("../../services/jobentryService");
exports.jobentryController = async (req, res) => {
    try {
        const jobentryData = Joi.object({
            quotation_id: Joi.optional(),
            job_id: Joi.optional(),
            job_number: Joi.required(),
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            job_details: Joi.string().required(),
            job_type: Joi.string().required(),
            job_startDate: Joi.string().required(),
            job_endDate: Joi.string().required(),
            equipments: Joi.required(),
            emp_id: Joi.optional(),
            external_employee: Joi.optional(),
            products: Joi.optional(),
            cust_name: Joi.string().required(),
            cust_phoneNo: Joi.string().required(),
            cust_altPhoneNo: Joi.optional(),
            cust_email: Joi.optional(),
            cust_address: Joi.string().required(),
            country_id: Joi.number().required(),
            state_id: Joi.number().required(),
            cust_city: Joi.string().required(),
            cust_pin: Joi.optional(),
            event_location: Joi.string().required(),
            total_amount: Joi.number().required(),
            booking_amount: Joi.number().required(),
            due_amount: Joi.number().required(),
            booked_from: Joi.optional()
        });

        const { error, value } = jobentryData.validate(req.body);
        if (error) {
            logger.error(`Invalid job entry data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid job entry data`);
        const resp = await jobentryService.jobentry(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: resp, response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        console.log(error)
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};
