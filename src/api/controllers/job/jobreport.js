const logger = require("../../../config/logger");
const Joi = require('joi');
const jobreportService = require("../../services/jobreportService");
const xlsx = require('xlsx');
const fs = require('fs');
exports.jobreportController = async (req, res) => {
    try {
        const joblistReportCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            start_date: Joi.required(),
            end_date: Joi.required()
        });
        const { error, value } = joblistReportCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for job list Report: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for job list Report:`);
        const resp = await jobreportService.getJobListReport(req.body);
        const excelFilePath = 'jobreport.xlsx';
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
        console.log('job list report controller error: ', error)
        logger.error('job list report controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};

async function exportToExcel(data, excelFilePath) {
    const workbook = xlsx.utils.book_new();
    const headers = ['Job Number', 'Job Details', 'Job Start Date', 'Job End Date', 'Products', 'Customer Name', 'Customer Phn.', 'Customer Alt Phn.', 'Customer Email', 'Customer Address', 'Event Location', 'Total Amount', 'Booking Amount', 'Equipments', 'Payment Amount', 'Due Amount', 'Total Paid Amount', 'Last Paid Amount', 'Last Payment Date'];
    const worksheet = [headers, ...data.map(row => [
        row.job_number,
        row.job_details,
        row.job_startDate,
        row.job_endDate,
        row.products,
        row.cust_name,
        row.cust_phoneNo,
        row.cust_altPhoneNo,
        row.cust_email,
        row.cust_address,
        row.event_location,
        row.total_amount,
        row.booking_amount ? row.booking_amount : 0.00,
        row.equipments,
        row.payment_amount ? row.payment_amount : 0.00,
        row.due_amount ? row.due_amount : 0.00,
        row.total_paid_amount ? row.total_paid_amount : 0.00,
        row.last_paid_amount ? row.last_paid_amount : 0.00,
        row.last_payment_date ? row.last_payment_date : 0.00
    ])];
    const ws = xlsx.utils.aoa_to_sheet(worksheet);
    xlsx.utils.book_append_sheet(workbook, ws, 'Data');
    xlsx.writeFile(workbook, excelFilePath);
}
