const logger = require("../../../config/logger");
const Joi = require('joi');
const quotationReportService = require("../../services/quotationReportService")
const xlsx = require('xlsx');
const fs = require('fs');
exports.quotationreportController = async (req, res) => {
    try {
        const quotationReportCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            start_date: Joi.required(),
            end_date: Joi.required()
        });
        const { error, value } = quotationReportCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for quotation list Report: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for quotation list Report:`);
        const resp = await quotationReportService.getQuotationListReport(req.body);
        const excelFilePath = 'quotationreport.xlsx';
        await exportToExcel(resp, excelFilePath);
        
        if (resp) {
            return res.download(excelFilePath, (err) => {
                if (err) {
                    console.error('Error while downloading file:', err);
                    return res.status(500).json({ success: false, status: 500, message: 'Error while downloading file' });
                }
                fs.unlinkSync(excelFilePath);
            });
        } else {
            return res.json({ success: false, status: 500, response: [] });
        }
    } catch (error) {
        console.log('quotation list report controller error: ', error);
        logger.error('quotation list report controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};

async function exportToExcel(data, excelFilePath) {
    const workbook = xlsx.utils.book_new();
    const headers = ['Quotation Number', 'Job Details', 'Job Start Date', 'Job End Date', 'Deliverables', 'Customer Name', 'Customer Phn.', 'Customer Alt Phn.', 'Customer Email', 'Customer Address', 'Event Location', 'Total Amount'];
    const worksheet = [headers, ...data.map(row => [
        row.quotation_number,
        row.job_details,
        row.job_startDate,
        row.job_endDate,
        row.deliverables,
        row.cust_name,
        row.cust_phoneNo,
        row.cust_altPhoneNo,
        row.cust_email,
        row.cust_address,
        row.event_location,
        row.total_amount
    ])];
    const ws = xlsx.utils.aoa_to_sheet(worksheet);
    xlsx.utils.book_append_sheet(workbook, ws, 'Data');
    xlsx.writeFile(workbook, excelFilePath);
}