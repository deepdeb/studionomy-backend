const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.quoteNumberGenerate = async (data) => {
    try {
        var quote_No_Start = '0000';
        var quote_number = await last_quote_number(data);
        if (quote_number) {
            quote_number = Number(quote_number) + 1;
            quote_number = quote_No_Start + quote_number;
        } else {
            quote_number = quote_No_Start + '1';
        }
        return quote_number;
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}

last_quote_number = async (data) => {
    try {
        let check_quotation_sql = "SELECT quotation_number FROM quotations WHERE userId =? AND userType = ? ORDER BY quotation_id DESC LIMIT 1"
        let [last_quotation_no] = await readPool.query(check_quotation_sql, [data.userId, data.userType]);
        console.log("last_quotation_no", last_quotation_no);
        return last_quotation_no[0].quotation_number;
    }
    catch (err) {
        logger.error(err);
    }
}