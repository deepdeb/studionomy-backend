const logger = require("../../../config/logger");
const Joi = require('joi');
const fs = require('fs');
const pdf = require('puppeteer');

exports.quotePuppeteerController = async (req, res) => {
    try {
        const quotationpdfData = Joi.object({
            userId: Joi.required(),
            userType: Joi.required(),
            studioName: Joi.required(),
            job_details: Joi.required(),
            quotation_number: Joi.required(),
            job_startDate: Joi.required(),
            job_endDate: Joi.required(),
            bookingDates: Joi.required(),
            specializations: Joi.required(),
            crews: Joi.required(),
            address: Joi.required(),
            cust_firstName: Joi.required(),
            cust_lastName: Joi.required(),
            cust_phoneNo: Joi.required(),
            cust_altPhoneNo: Joi.required(),
            cust_email: Joi.required(),
            eventLocation: Joi.required(),
            total_amt: Joi.required(),
            projectDesc: Joi.required(),
            quotethemeImg: Joi.optional(),
            customName: Joi.optional(),
            customValue: Joi.optional(),
            deliverables: Joi.required(),
            termscondition: Joi.required()
        });

        // Validate the data
        const { error, value } = quotationpdfData.validate(req.body);
        if (error) {
            logger.error(`Invalid quotation data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid quotation data`);

        // Launch Puppeteer browser
        let browser;
        try {
            browser = await pdf.launch({ args: ['--no-sandbox'] });
            // browser = await pdf.launch();
            logger.info('Puppeteer browser launched successfully.');
        } catch (browserLaunchError) {
            logger.info('Error launching Puppeteer browser: ', browserLaunchError);
            return res.status(500).json({ success: false, message: 'Error launching browser', error: browserLaunchError.message });
        }

        // Create a new page in the browser
        let page
        try {
            logger.info('new page in browser try before')
            page = await browser.newPage();
            logger.info('page>>>>', page);
            logger.info('new page in browser after')

        } catch (pageCreationError) {
            logger.info('Error creating new page in browser: ', pageCreationError);
            return res.status(500).json({ success: false, message: 'Error creating new page', error: pageCreationError.message });
        }

        // Set the content for the page
        try {
            logger.info('set content try block before');
            await page.setContent('<html><head></head><body><h1>SL</h1></body></html>');
            logger.info('Page content set successfully.');
        } catch (pageContentError) {
            logger.info('Error setting page content: ', pageContentError);
            return res.status(500).json({ success: false, message: 'Error setting page content', error: pageContentError.message });
        }

        // Generate PDF buffer
        let pdfBuffer;
        try {
            pdfBuffer = await page.pdf({ format: 'A3', printBackground: true });
            logger.info('PDF generated successfully.');
        } catch (pdfError) {
            logger.error('Error generating PDF: ', pdfError);
            return res.status(500).json({ success: false, message: 'Error generating PDF', error: pdfError.message });
        }

        // Close the browser
        try {
            await browser.close();
            logger.info('Puppeteer browser closed successfully.');
        } catch (browserCloseError) {
            logger.error('Error closing Puppeteer browser: ', browserCloseError);
            return res.status(500).json({ success: false, message: 'Error closing browser', error: browserCloseError.message });
        }

        // Write PDF buffer to file
        try {
            fs.writeFileSync('./output.pdf', pdfBuffer);
            logger.info('PDF saved to output.pdf successfully.');
        } catch (fileError) {
            logger.error('Error saving PDF file: ', fileError);
            return res.status(500).json({ success: false, message: 'Error saving PDF file', error: fileError.message });
        }

        // Respond with success message
        res.status(200).json({ success: true, message: 'PDF created successfully' });
        logger.info('Response sent: PDF created successfully.');

    } catch (error) {
        logger.error('Error creating PDF: ', error);
        res.status(500).json({ success: false, message: 'Error creating PDF', error: error.message });
    }
}

// const browse = async (browser) => {
//     logger.info('new page in browser before')
//     try {
//         logger.info('browse function try block before')
//         const newPage = browser.newPage();
//         logger.info('browse function try block after');
//         logger.info('new page: ', newPage);
//         return newPage;
//     } catch (error) {
//         logger.info('browse catch block error:', error);
//     }
// }
