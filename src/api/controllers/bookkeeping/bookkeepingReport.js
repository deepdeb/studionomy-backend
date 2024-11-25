const logger = require("../../../config/logger");
const Joi = require('joi');
const bookkeepingReportService = require("../../services/bookkeepingReportService");
const xlsx = require('xlsx');
const fs = require('fs');
exports.bookkeepingListReportController = async (req, res) => {
    try {
        const bookkeepinglistReportCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            start_date: Joi.required(),
            end_date: Joi.required()
        });
        const { error, value } = bookkeepinglistReportCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for bookkeeping list report : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for bookkeeping list report :`);
        const resp = await bookkeepingReportService.getBookkeepingListReport(req.body);
        const excelFilePath = 'bookkeeping_list_report.xlsx';
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
        logger.info('bookkeeping list report controller error: ', error);
        console.log('bookkeeping list report controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};

async function exportToExcel(data, excelFilePath) {
    const workbook = xlsx.utils.book_new();
    const headers = ['Book Date', 'Description', 'Debit Amount', 'Debit Mode', 'Credit Amount', 'Credit Mode', 'Closing Balance', 'Remarks'];
    const worksheet = [headers, ...data.map(row => [
        row.book_date,
        row.b_description,
        row.debit_amount,
        row.debit_mode,
        row.credit_amount,
        row.credit_mode,
        row.closing_balance,
        row.remarks
    ])];
    const ws = xlsx.utils.aoa_to_sheet(worksheet);
    xlsx.utils.book_append_sheet(workbook, ws, 'Data');
    xlsx.writeFile(workbook, excelFilePath);
}