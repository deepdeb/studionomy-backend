const logger = require("../../../config/logger");
const Joi = require('joi');
const jobbookkeepingReportService = require("../../services/jobbookkeepingReportService");
const xlsx = require('xlsx');
const fs = require('fs');
exports.jobbookkeepingListReportController = async (req, res) => {
    try {
        const jobbookkeepinglistReportCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            start_date: Joi.required(),
            end_date: Joi.required()
        });
        const { error, value } = jobbookkeepinglistReportCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for job bookkeeping list report : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for job bookkeeping list report :`);
        const resp = await jobbookkeepingReportService.getJobbookkeepingListReport(req.body);
        const excelFilePath = 'job_ledger_report.xlsx';
        await exportToExcel(resp, excelFilePath);

        if (resp) {
            return res.download(excelFilePath, (err) => {
                if (err) {
                    console.error('Error while downloading file:', err);
                    return res.status(500).json({ success: false, status: 500, message: 'Error while downloading file:' });
                }
                fs.unlinkSync(excelFilePath);
            });
        } else {
            return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
        }
    } catch (error) {
        logger.info('job bookkeeping list report controller error: ', error);
        console.log('job bookkeeping list report controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};

async function exportToExcel(data, excelFilePath) {
    const workbook = xlsx.utils.book_new();
    const headers = ['Payment Date', 'Description', 'Job Number', 'Job Value', 'Particulars', 'Payment Amount/Expense', 'Payment Status', 'Profit/Loss', 'Customer Phone No.'];
    const worksheet = [headers, ...data.map(row => [
        row.payment_date,
        row.payment_description,
        row.job_number,
        row.job_value,
        row.payment_type,
        row.payment_amount,
        row.payment_status,
        row.profit,
        row.cust_phoneNo
    ])];
    const ws = xlsx.utils.aoa_to_sheet(worksheet);
    xlsx.utils.book_append_sheet(workbook, ws, 'Data');
    xlsx.writeFile(workbook, excelFilePath);
}