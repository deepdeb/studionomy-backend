const logger = require("../../../config/logger");
const Joi = require('joi');
const nodemailer = require('nodemailer');

exports.sendMailController = async (req, res) => {
    try {
        const mailData = Joi.object({
            toRegisteredMail: Joi.required(),
            sentOTP: Joi.required()
        })
        const { error, value } = mailData.validate(req.body);
        if (error) {
            logger.error(`Invalid mail data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid mail data`);
        try {
            logger.info(`Valid mail data in try`);
            logger.info(`Valid mail data in try`);
            const transporter = nodemailer.createTransport({
                // host: "studionomy.com",
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    // user: "debnath.pradeep619@gmail.com",
                    // pass: "ntzi wscs omve orvp"
					user: process.env.NODEMAILER_USER,
					pass: process.env.NODEMAILER_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false,
                  },
            })
            logger.info(`Enter transporter`);
            const mailOptions = {
                from: process.env.NODEMAILER_USER,
                to: value.toRegisteredMail,
                subject: 'STUDIOLANCERS Password Reset',
                html: `
        <html>
            <body>
                <p>Dear User,</p>
                <p>Your OTP for Password reset is: <strong>${value.sentOTP}</strong></p>
                <br>
                <p>Regards,</p>
                <p>Studiolancers</p>
            </body>
        </html>
    `
            }
            logger.info(`Enter mailOptions`);
            try {
                transporter.sendMail(mailOptions, (error, info) => {
                    logger.info(`Enter error send mail`, error);
                    logger.info(`Enter info send mail`, info);
                    if (info) {
                        logger.info('mail info', info);
                        return res.json({ success: true, status: 200, message: "Check Email for OTP", response: info })
                    } else {
                        return res.json({ success: false, status: 500, message: 'Internal server error', response: error })
                    }
                })
            } catch (err) {
                logger.info("mail send function: ", err);
            }
        } catch (error) {
            logger.error("mail send error: ", error);
            logger.info("mail send error: ", error);
        }
    } catch (error) {
        logger.error("mail send error: ", error);
        logger.info("mail send error: ", error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
}