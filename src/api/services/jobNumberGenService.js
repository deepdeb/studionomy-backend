const readPool = require('../../config/mysql').readPool
const logger = require("../../config/logger");
exports.jobNumberGenerate = async (data) => {
    try {
        var job_No_Start = '0000';
        var job_number = await last_job_number(data);
        if (job_number) {
            job_number = Number(job_number) + 1;
            job_number = job_No_Start + job_number;
        } else {
            job_number = job_No_Start + '1';
        }
        return job_number;
    }
    catch (err) {
        logger.error(err);
        return false;
    }
}

last_job_number = async (data) => {
    try {
        let check_job_sql = "SELECT job_number FROM jobs WHERE userId =? AND userType = ? ORDER BY job_id DESC LIMIT 1"
        let [last_job_no] = await readPool.query(check_job_sql, [data.userId, data.userType]);
        console.log("last_job_no", last_job_no);
        return last_job_no[0].job_number;
    }
    catch (err) {
        logger.error(err);
    }
}
