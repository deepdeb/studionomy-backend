const writePool = require('../../config/mysql').writePool
const logger = require("../../config/logger");
exports.createQuotation = async (data) => {
    try {
        console.log('enter')
        let sql = "INSERT INTO quotations (userId,userType,quotation_number,studio_name,address,job_details,cust_firstName,cust_lastName,job_startDate,job_endDate,event_location,cust_email,cust_phoneNo,cust_altPhoneNo,total_amount,project_desc,job_type,quotethemeImg,customName,customValue,deliverables,termscondition) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        const [resp] = await writePool.query(sql, [data.userId, data.userType, data.quotation_number, data.studioName, data.address, data.job_details, data.cust_firstName, data.cust_lastName, data.job_startDate, data.job_endDate, data.eventLocation, data.cust_email, data.cust_phoneNo, data.cust_altPhoneNo, data.total_amt, data.projectDesc, data.jobType, data.quotethemeImg, data.customName, data.customValue, data.deliverables, data.termscondition]);
        //return resp.insertId;

        for(let i = 0; i < data.bookingDates.length; i++){
            let bookingDate = data.bookingDates[i];
            let specialization = data.specializations[i];
            let crew = data.crews[i];
            
            let insertQuotationBookSql = "INSERT INTO quotation_book (quotation_id, bookingDate, specialization, crew) VALUES (?,?,?,?)"
            const [insertQuotationBookResp] = await writePool.query(insertQuotationBookSql, [resp.insertId, bookingDate, specialization, crew]);
        }
        return resp;
    }
    catch (err) {
        console.log(err)
        logger.error(err);
        return false;
    }
}