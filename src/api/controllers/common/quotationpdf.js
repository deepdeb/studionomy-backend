const logger = require("../../../config/logger");
const Joi = require('joi');
const pdf2 = require('html-pdf-node');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
exports.quotationpdfController = async (req, res) => {
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
        const { error, value } = quotationpdfData.validate(req.body);
        if (error) {
            logger.error(`Invalid quotation data : ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        logger.info(`Valid quotation data`);

        const imageDataPath = path.resolve(__dirname, '../../../../public/uploads/themes/SL-Logo.png');
        const backgroundImageDataPath = path.resolve(__dirname, `../../../../public/uploads/images/${value.quotethemeImg}`);
        const backgroundImageData2Path = path.resolve(__dirname, `../../../../public/uploads/images/${value.quotethemeImg}`);

        const imageData = fs.readFileSync(imageDataPath, 'base64');
        const backgroundImageData = fs.readFileSync(backgroundImageDataPath, 'base64');
        const backgroundImageData2 = fs.readFileSync(backgroundImageData2Path, 'base64')
        logger.info(`Before Html content`);
        let htmlContent = `<html><head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
                href="https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&family=Raleway:wght@300;400;500;600;700&display=swap"
                rel="stylesheet" />
        </head>

            <body>
            <div class="section_theme"
                style="background-image: url(data:image/jpg;base64,${backgroundImageData}); background-size: contain; background-position: top center; background-repeat: no-repeat; width: 800px; height: 100%; display: table; margin: auto;">
                    <table cellpadding="0" cellspacing="0" width="100%" align="center" style="text-align: center; height:auto;">
                        <tr>
                            <table style="padding: 0 100px; text-align: center; margin: 0 auto;">
                                <tr>
                                    <td
                                        style="text-align: center; padding-top: 100px; width: 200px; height: 200px; display: table; margin: auto;">
                                        <img src="data:image/png;base64,${imageData}" style="width: 100%; height: 100%; object-fit: contain;" alt="" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-family: 'Raleway', sans-serif; font-size: 28px; font-weight: 700; text-align: center;">
                                        <h2 style="margin: 10px 0;">${value.studioName}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-size: 20px; font-family: 'PT Serif', serif; font-weight: 400; text-align: center;">
                                        <strong>Address:</strong> <br />
                                        <p style="margin: 5px 0; font-weight: 400; font-size: 16px;">
                                            ${value.address}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h2
                                            style="font-size: 30px; font-family: 'Raleway', sans-serif; display: inline-block; border-bottom: 2px solid #000; padding-bottom: 5px; margin: 10px 0;">
                                            ${value.job_details}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h1 style="font-family: 'PT Serif'; font-size: 42px; color: tomato; margin: 10px 0;">
                                            <p style="margin: 0; line-height: 1;">${value.job_details}</p>
                                            <p style="margin: 0; line-height: 1;">&</p>
                                            <p style="margin: 0; line-height: 1;">${value.job_details}</p>
                                        </h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 style="margin: 10px 0; font-size: 16px; font-family: 'Raleway', sans-serif;">On</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4
                                            style="font-size: 20px; display: flex; align-items: center; column-gap: 10px; justify-content: center; margin: 0; font-family: 'PT Serif';">
                                            <p style="margin: 0;">${value.job_startDate}</p>
                                            to
                                            <p style="margin: 0;">${value.job_endDate}</p>
                                        </h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 style="margin: 0px 0; font-size: 16px; font-family: 'Raleway', sans-serif;">At</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h2 style="font-size: 30px; margin: 0; font-family: 'PT Serif';">${value.eventLocation}</h2>
                                    </td>
                                </tr>
                            </table>
                        </tr>
                    </table>
                </div>

                <div class="section_theme"
                style="background-image: url(data:image/jpg;base64,${backgroundImageData2}); background-size: contain; background-position: top center; background-repeat: no-repeat; width: 800px; height: 100%; display: table; margin: auto;">
                    <table cellpadding="0" cellspacing="0" width="100%" align="center" style="text-align: center; margin: 0 auto; height:auto;">
                        <tr>
                            <td>
                                <table style="padding: 100px 40px 100px 65px; text-align: center; width: 100%;">
                                    <tr>
                                        <td style="width: 25%;">
                                            <img src="data:image/png;base64,${imageData}" style="width: 100%; height: 100%; object-fit: cover;" alt=""></img>
                                        </td>
                                        <td style="width: 75%; vertical-align: top; text-align: left; padding-left: 30px;">
                                            <h2 style="font-family: 'PT Serif'; font-size:25px; font-weight: 700; margin: 0 0 5px 0; text-transform: uppercase;">${value.cust_firstName}</h2>
                                            <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 5px 0;">${value.cust_phoneNo} / ${value.cust_altPhoneNo}</h2>
                                            <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 5px 0;">COST - ${value.total_amt}</h2>
                                            <h2 style="font-family: 'PT Serif'; font-size: 20px; font-weight: 700; margin: 0 0 5px 0;">Projects Description:</h2>
                                            <p style="font-size: 16px; font-family: 'PT Serif'; line-height: 25px; margin-top: 10px;">${value.projectDesc}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <table style="width: 100%; border-collapse: collapse;" border="0">
                                                <tr>
                                                    <th style="width: 100%;">
                                                        <h2 style="margin: 0;text-align: left; font-size: 18px; font-family: 'PT Serif'; font-weight: 700; border-bottom: 2px solid black;">Days - Crew Details(All Events in ${value.eventLocation})</h2>
                                                    </th>
                                                </tr>`
        for (let i = 0; i < value.bookingDates.length; i++) {
            htmlContent += `
                                                <tr>
                                                    <td style="display: flex; font-family: 'PT Serif'; gap: 10px; text-align: left; border-bottom: 1px solid #e5e5e5; padding: 10px 0;">
                                                        <strong>${value.bookingDates[i]}</strong>
                                                        <p style="margin: 0; text-transform: capitalize; font-size: 14px;">${value.specializations[i]}</p>
                                                        <p style="white-space: nowrap; margin: 0;">${value.crews[i]}</p>
                                                    </td>
                                                </tr>
                                            `;
        }
        htmlContent += `</table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="section_theme"
                style="background-image: url(data:image/jpg;base64,${backgroundImageData2}); background-size: cover; background-position: top center; background-repeat: no-repeat; width: 800px; height: 100%; max-height:1191px; display: table; margin: auto;">
                    <table cellpadding="0" cellspacing="0" width="100%" align="center" style="text-align: center; height:auto;">
                        <tr>
                            <table style="padding: 100px 40px 100px 65px; text-align: center; width: 100%;">
                                <tr>
                                    <td style="text-align: left;" colspan="2">
                                        <h2 style="text-transform: uppercase; font-family: 'PT Serif'; font-size: 18px; margin: 5px 0;">Deliverables</h2>
                                        <ul style="margin: 0;">
                                            <li>
                                                <p style="margin: 5px 0; font-size: 15px; font-family: 'PT Serif';">${value.deliverables}
                                                </p>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: left;">
                                        <h2 style="text-transform: uppercase; font-family: 'PT Serif'; font-size: 18px; margin: 0;">Custom Field Name</h2>
                                        <tr>
                                            <td>
                                                <table width="100%" border="1" cellpadding="4" cellspacing="0">
                                                    <tr>
                                                        <td align="left">${value.customName}</td>
                                                        <td align="left">${value.customValue}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: left;" colspan="2">
                                        <h2 style="text-transform: uppercase; font-family: 'PT Serif'; font-size: 18px; margin: 0;">Terms & Conditions</h2>
                                        <ul style="margin: 0;">
                                            <li>
                                                <p style="margin: 5px 0; font-size: 15px; font-family: 'PT Serif';">${value.termscondition}
                                                </p>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                        </tr>
                    </table>
                </div>
            </body>
        </html>`
        logger.info(`Html text`);
        const overlayImagePath1 = backgroundImageDataPath
        const overlayImagePath2 = backgroundImageData2Path

        let file = { content: htmlContent };
        logger.info(`before generate pdf`)
        const pdfBuffer = await generatePdf(file)
        logger.info(`after generate pdf`)
        logger.error("pdfBuffer>>>>",pdfBuffer);
        if (pdfBuffer) {
            logger.info("pdfBuffer>>>enter>",pdfBuffer);
            const modifiedPdfBufferArray = await addOverlayImagesToPdfBuffer(pdfBuffer, overlayImagePath1, overlayImagePath2)
            logger.info("modifiedPdfBufferArray>>>enter>",modifiedPdfBufferArray);
            const modifiedPdfBuffer = Buffer.from(modifiedPdfBufferArray);
            res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename=quotation.pdf' });
            return res.send(modifiedPdfBuffer)
        } else {
            return res.json({ success: false, status: 500, message: "Error reading file" })
        }
    } catch (error) {
        console.log(error);
        logger.error("error",error);
        logger.info("error",error);
        logger.error(res.message);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};

// const generatePdf = async (htmlContent) => {
//     return new Promise((resolve, reject) => {
//         pdf.create(htmlContent).toBuffer((err, buffer) => {
//             if (err) {
//                 console.error(err);
//                 logger.error(`Error generating PDF: ${err.message}`);
//                 reject(new Error('Error generating PDF'));
//             } else {
//                 resolve(buffer)
//             }
//         });
//     });
// };

const generatePdf = (htmlContent) => {
    logger.info('inside generatePdf first')
    try {
        logger.info('enter generatePdf try block')
        return pdf2.generatePdf(htmlContent, { format: 'A4' })
        .then(pdfBuffer => {
            if (pdfBuffer) {
                return pdfBuffer;
            } else {
                throw new Error('PDF generation failed.');
            }
        })
        .catch(error => {  
            logger.info('inside generatepdf error: ', error) 
            throw error;
        });
    } catch (error) {
        logger.info('Outside catch error: ', error)
        throw error;
    }
};

const addOverlayImagesToPdfBuffer = async (pdfBuffer, overlayImagePath1, overlayImagePath2) => {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const overlayImageBytes1 = fs.readFileSync(overlayImagePath1);
    const overlayImageBytes2 = fs.readFileSync(overlayImagePath2);
    const overlayImage1 = await pdfDoc.embedJpg(overlayImageBytes1);
    const overlayImage2 = await pdfDoc.embedJpg(overlayImageBytes2);

    const firstPage = pdfDoc.getPage(0);
    const overlayImageWidth1 = overlayImage1.width;
    const overlayImageHeight1 = overlayImage1.height;
    const { width: firstPageWidth, height: firstPageHeight } = firstPage.getSize();
    const scale1 = Math.min(firstPageWidth / overlayImageWidth1, firstPageHeight / overlayImageHeight1);
    const x1 = (firstPageWidth - overlayImageWidth1 * scale1) / 2;
    const y1 = (firstPageHeight - overlayImageHeight1 * scale1) / 2;
    firstPage.drawImage(overlayImage1, {
        x: x1,
        y: y1,
        width: overlayImageWidth1 * scale1,
        height: overlayImageHeight1 * scale1,
        opacity: 0.3
    });

    const pages = pdfDoc.getPages();
    for (let i = 1; i < pages.length; i++) {
        const page = pages[i];
        const overlayImageWidth2 = overlayImage2.width;
        const overlayImageHeight2 = overlayImage2.height;
        const { width, height } = page.getSize();
        const scale2 = Math.min(width / overlayImageWidth2, height / overlayImageHeight2);
        const x2 = (width - overlayImageWidth2 * scale2) / 2;
        const y2 = (height - overlayImageHeight2 * scale2) / 2;

        page.drawImage(overlayImage2, {
            x: x2,
            y: y2,
            width: overlayImageWidth2 * scale2,
            height: overlayImageHeight2 * scale2,
            opacity: 0.3
        });
    }

    const modifiedPdfBytes = await pdfDoc.save();
    return modifiedPdfBytes;
};


