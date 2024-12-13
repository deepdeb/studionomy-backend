const logger = require("../../../config/logger");
const Joi = require('joi');
const pdf = require('html-pdf');
exports.quoteHtmlPdfController = async (req, res) => {
    try {
        const quotationHtmlPdfData = Joi.object({
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
        const { error, value } = quotationHtmlPdfData.validate(req.body);
        if (error) {
            logger.error(`Invalid quotation data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid quotation data`);

        let htmlContent = `<html><head></head><body><h1>SL</h1></body></html>`

        const pdfBuffer = await generatePDF(htmlContent);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=quotation.pdf'
        });
        if (pdfBuffer) {
            return res.send(pdfBuffer);
        }
        else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        console.log(error);
        logger.info("error:", error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};

const generatePDF = (htmlContent) => {
    try {
        return new Promise((resolve, reject) => {
            pdf.create(htmlContent).toBuffer((err, buffer) => {
                if (err) {
                    logger.info("pdf>>>", err);
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        });
    } catch (error) {
        logger.info("generatePDF>>>", error);
    }
};