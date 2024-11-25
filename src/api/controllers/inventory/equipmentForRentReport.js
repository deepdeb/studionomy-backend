const logger = require("../../../config/logger");
const Joi = require('joi');
const equipmentForRentReportService = require("../../services/equipmentForRentReportService");
const xlsx = require('xlsx');
const fs = require('fs');
exports.equipmentForRentListReportController = async (req, res) => {
    try {
        const equipmentForRentListReportData = Joi.object({
            userId: Joi.number().required(),
            userType: Joi.number().required()
        });
        const { error, value } = equipmentForRentListReportData.validate(req.body);
        if (error) {
            logger.error(`Invalid equipment for rent list report data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid equipment for rent list report data`);
        const resp = await equipmentForRentReportService.getEquipmentForRentListReport(req.body);
        const excelFilePath = 'equipment_for_rent_list_report.xlsx';
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
        logger.info('equipment for rent list report controller error: ', error);
        console.log('equipment for rent list report controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};

async function exportToExcel(data, excelFilePath) {
    const workbook = xlsx.utils.book_new();
    const headers = ['Equipment Category Name', 'Equipment Sub Category Name', 'Brand Name', 'Model Name'];
    const worksheet = [headers, ...data.map(row => [
        row.equ_categoryName,
        row.sub_cate_name,
        row.brand_name,
        row.modelName
    ])];
    const ws = xlsx.utils.aoa_to_sheet(worksheet);
    xlsx.utils.book_append_sheet(workbook, ws, 'Data');
    xlsx.writeFile(workbook, excelFilePath);
}
