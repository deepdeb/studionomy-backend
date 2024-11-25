const logger = require("../../../config/logger");
const Joi = require('joi');
const employeeAttendanceReportService = require("../../services/employeeAttendanceReportService")
const xlsx = require('xlsx');
const fs = require('fs');
exports.employeeAttendanceListReportController = async (req, res) => {
    try {
        const employeeAttendanceListReportCheck = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required(),
            start_date: Joi.required(),
            end_date: Joi.required()
        });
        const { error, value } = employeeAttendanceListReportCheck.validate(req.body);
        if (error) {
            logger.error(`Invalid data for employee attendance list report : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid data for employee attendance list report :`);
        const resp = await employeeAttendanceReportService.getEmployeeAttendanceListReport(req.body);
        const excelFilePath = 'employee_attendance_report.xlsx';
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
            return res.json({ success: false, status: 500, response: [] });
        }
    } catch (error) {
        logger.info('employee attendance report controller error: ', error);
        console.log('employee attendance report controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};

async function exportToExcel(data, excelFilePath) {
    const workbook = xlsx.utils.book_new();
    const headers = ['Date', 'Employee Name', 'Employee Phone', 'Employee Email', 'Employee Address', 'Attendance', 'Outdoor Hrs.', 'Remarks'];
    const worksheet = [headers, ...data.map(row => [
        row.empEntryTime,
        row.empName,
        row.empPhone,
        row.empEmail,
        row.empAddr,
        row.emp_attendance,
        row.emp_outdoor_hrs,
        row.empRemarks
    ])];
    const ws = xlsx.utils.aoa_to_sheet(worksheet);
    xlsx.utils.book_append_sheet(workbook, ws, 'Data');
    xlsx.writeFile(workbook, excelFilePath);
}
