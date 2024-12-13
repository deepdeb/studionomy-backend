const logger = require("../../../config/logger");
const Joi = require('joi');
const fs = require('fs');
const pdf = require('puppeteer');
const path = require('path');

exports.quotePuppeteerController = async (req, res) => {
    try {
        const directory = path.join(__dirname, '../../../../public/uploads/quotes/');
        console.log('>>>', directory);
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
        let htmlContent = '<html><head></head><body><h1>SL</h1></body></html>';
        let browser;
        try {
            browser = await pdf.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                timeout: 60000
            });
            logger.info('Puppeteer browser launched successfully.');

            if (browser) {
                let page = await browse(browser);
                if (page) {
                    logger.info("Setting content on the page...");
                    // await page.setContent(htmlContent);
                    await page.goto('https://studionomy.com', { waitUntil: 'domcontentloaded', timeout: 60000 }); // Increase timeout here
                    await page.setContent(htmlContent, { timeout: 60000 }); // Increase timeout here
                    let pdfBuffer = await page.pdf({ format: 'A4', timeout: 60000 }); // Increase timeout here

                    // let pdfBuffer = await page.pdf({ format: 'A4' });
                    await browser.close();
                    fs.writeFileSync(directory + 'quotation.pdf', pdfBuffer);
                    res.status(200).json({ success: true, message: 'PDF created successfully' });
                    logger.info('Response sent: PDF created successfully.');
                }
            }
        } catch (error) {
            logger.info('Error during PDF creation process:', error);
            if (browser) await browser.close(); // Ensure the browser is closed in case of an error
            return res.status(500).json({ success: false, message: 'Error creating PDF', error: error.message });
        }

        // Create a new page in the browser


        // let page = "";
        // try {
        //     logger.info('new page in browser try before')
        //     page = await browse(browser);
        //     logger.info('page: ', page);
        //     logger.info('new page in browser after')
        //     if (page) {
        //         await page.setContent('<html><head></head><body><h1>SL</h1></body></html>');
        //         let pdfBuffer = await page.pdf({ format: 'A4' });
        //         await browser.close();
        //         fs.writeFileSync(directory + 'quotation.pdf', pdfBuffer);
        //         res.status(200).json({ success: true, message: 'PDF created successfully' });
        //         logger.info('Response sent: PDF created successfully.');

        //     }

        // } catch (pageCreationError) {
        //     logger.info('Error creating new page in browser: ', pageCreationError);
        //     return res.status(500).json({ success: false, message: 'Error creating new page', error: pageCreationError.message });
        // }

        // Set the content for the page

        // try {
        //     logger.info('set content try block before');
        //     await page.setContent('<html><head></head><body><h1>SL</h1></body></html>');
        //     logger.info('Page content set successfully.');
        // } catch (pageContentError) {
        //     logger.info('Error setting page content: ', pageContentError);
        //     return res.status(500).json({ success: false, message: 'Error setting page content', error: pageContentError.message });
        // }

        // Generate PDF buffer

        // let pdfBuffer;
        // try {
        //     pdfBuffer = await page.pdf({ format: 'A3', printBackground: true });
        //     logger.info('PDF generated successfully.');
        // } catch (pdfError) {
        //     logger.error('Error generating PDF: ', pdfError);
        //     return res.status(500).json({ success: false, message: 'Error generating PDF', error: pdfError.message });
        // }

        // Close the browser

        // try {
        //     await browser.close();
        //     logger.info('Puppeteer browser closed successfully.');
        // } catch (browserCloseError) {
        //     logger.error('Error closing Puppeteer browser: ', browserCloseError);
        //     return res.status(500).json({ success: false, message: 'Error closing browser', error: browserCloseError.message });
        // }

        // Write PDF buffer to file

        // try {
        //     fs.writeFileSync(directory + 'output.pdf', pdfBuffer);
        //     logger.info('PDF saved to output.pdf successfully.');
        // } catch (fileError) {
        //     logger.error('Error saving PDF file: ', fileError);
        //     return res.status(500).json({ success: false, message: 'Error saving PDF file', error: fileError.message });
        // }

        // Respond with success message


    } catch (error) {
        logger.error('Error creating PDF: ', error);
        res.status(500).json({ success: false, message: 'Error creating PDF', error: error.message });
    }
};

const browse = async (browserData) => {
    let newPage;
    logger.info('new page in browser before')
    try {
        logger.info('browse function try block before')
        try {
            logger.info('enter try block in newPage function')
            // newPage = await browserData.newPage();
            return await browserData.newPage();
        } catch (error) {
            logger.info('new page error:', error);
        }
        logger.info('browse function try block after');
        logger.info('new page: ', newPage);
    } catch (error) {
        logger.info('browse catch block error:', error);
    }
}


// let htmlContent = '<html><head></head><body><h1>SL</h1></body></html>';
// let browser;
// try {
//     browser = await pdf.launch({
//         headless: true,
//         args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });
//     logger.info('Puppeteer browser launched successfully.');

//     if (browser) {
//         let page = await browse(browser); // Corrected usage of the browse function
//         if (page) {
//             logger.info("Setting content on the page...");
//             await page.setContent(htmlContent); // Removed unnecessary log inside the function
//             let pdfBuffer = await page.pdf({ format: 'A4' });
//             await browser.close();
//             fs.writeFileSync(directory + 'quotation.pdf', pdfBuffer);
//             res.status(200).json({ success: true, message: 'PDF created successfully' });
//             logger.info('Response sent: PDF created successfully.');
//         }
//     }
// } catch (error) {
//     logger.error('Error during PDF creation process:', error);
//     if (browser) await browser.close(); // Ensure the browser is closed in case of an error
//     return res.status(500).json({ success: false, message: 'Error creating PDF', error: error.message });
// }