const readConn = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.bookingStatusByDates = async (data) => {
    try {
        var response = {}
        for (let userId of data.networkUserIds) {
            var resultArr = data.datesToCheck.map(date => ({
                date: date,
                req_status: null
            }))

            for (let date of data.datesToCheck) {
                let sql = "SELECT req_date, req_status from request_for_booking WHERE isDeleted=0 AND isCancel = 0 AND req_to = ? AND req_date = ?"
                const [resp] = await readConn.query(sql, [userId, date]);

                if (resp[0]) {
                    for (let result of resultArr) {
                        if (result.date == resp[0].req_date.toISOString().split('T')[0]) {
                            result.req_status = resp[0].req_status
                        }
                    }
                }
            }

            response[userId] = resultArr
        }

        return response

    }
    catch (err) {
        logger.error('booking status by dates service error: ', err);
        console.log('booking status by dates service error: ', err);
        return false;
    }
};