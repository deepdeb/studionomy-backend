const logger = require("../../../config/logger");
const Joi = require('joi');
const employeeReportService = require("../../services/employeeReportService");
const xlsx = require('xlsx');
const fs = require('fs');
exports.employeelistReportController = async (req, res) => {
    try {
        const employeelistReportCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required()
        });
        const { error, value } = employeelistReportCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for employee list report : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for employee list report :`);
        const resp = await employeeReportService.getEmployeeListReport(req.body);
        const excelFilePath = 'employee_list_report.xlsx';
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
        logger.info('employee list report controller error: ', error);
        console.log('employee list report controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};

async function exportToExcel(data, excelFilePath) {
    const workbook = xlsx.utils.book_new();
    const headers = ['Employee Name', 'Employee Phone', 'Employee Email', 'Employee Address', 'Date Of Joining'];
    const worksheet = [headers, ...data.map(row => [
        row.empName,
        row.empPhone,
        row.empEmail,
        row.empAddr,
        row.empDateOfJoin
    ])];
    const ws = xlsx.utils.aoa_to_sheet(worksheet);
    xlsx.utils.book_append_sheet(workbook, ws, 'Data');
    xlsx.writeFile(workbook, excelFilePath);
}