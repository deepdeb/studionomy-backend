const logger = require("../../../config/logger");
const Joi = require('joi');
const quotationService = require("../../services/quotationService");
exports.quotationController = async (req, res) => {
    try {
        const quotationData = Joi.object({
            userId: Joi.required(),
            userType: Joi.required(),
            studioName: Joi.required(),
            job_details: Joi.required(),
            quotation_number: Joi.required(),
            job_startDate: Joi.required(),
            job_endDate: Joi.required(),
            bookingDates: Joi.required(),
            specializations: Joi.required(),
            crews: Joi.required(),
            address: Joi.required(),
            cust_firstName: Joi.required(),
            cust_lastName: Joi.required(),
            cust_phoneNo: Joi.required(),
            cust_altPhoneNo: Joi.required(),
            cust_email: Joi.required(),
            eventLocation: Joi.required(),
            total_amt: Joi.required(),
            projectDesc: Joi.required(),
            quotethemeImg: Joi.optional(),
            customName: Joi.optional(),
            customValue: Joi.optional(),
            deliverables: Joi.required(),
            termscondition: Joi.required()
        });

        const { error, value } = quotationData.validate(req.body);
        if (error) {
            logger.error(`Invalid quotation data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid quotation data`);
        const resp = await quotationService.createQuotation(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: "Quotation created successfully", response: resp });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: null });
        }
    } catch (error) {
        console.log(error)
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};