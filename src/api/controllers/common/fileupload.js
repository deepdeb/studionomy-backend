const logger = require("../../../config/logger");
const formidable = require("formidable");
const fs = require('fs');
const path = require('path')
const multer = require('multer')
//const { FILEPATH } = require("../../../config/vars");

// const FILEPATH = "https://www.microbaseinfotech.com/SL-A-Images"

var genFileName = (filename) => {
    let splfile = filename.split(".");
    let ext = splfile.pop();
    let onlyfile = splfile.join('').replace(/[^a-zA-Z ]/g, "").replace(" ", "_").trim();
    return onlyfile + Date.now() + "." + ext;
}

exports.fileuploadController = async (req, res) => {
    // try {
    //     logger.info(`Valid fileupload data`);
    //     const form = new formidable.IncomingForm({ multiples: true, uploadDir: FILEPATH });
    //     let filename = '';
    //     let orgfilename = '';
    //     form.on('file', function (field, file) {
    //         //rename the incoming file to the file's name
    //         orgfilename = file.originalFilename
    //         filename = genFileName(file.originalFilename);
    //         fs.rename(file.filepath, form.uploadDir + "/" + filename, (err) => {
    //         });
    //     });
    //     form.parse(req, async (err, fields, files) => {
    //         console.log("File error>>>>>>",err);
    //         const data = fields;
    //         data['fileName'] =  filename;
    //         data['orgfilename'] = orgfilename;
    //         return res.json({ status: 200, message: 'File uploaded successfully', success: true, response: data });
    //     });
    // } 
    try {
        const uploadFolder = path.join(__dirname, '../../../../public/uploads/files/');
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, uploadFolder);
            },
            filename: function (req, file, cb) {
                const newFilename = `${Date.now()}_${file.originalname}`.replace(/ /g, "_");
                cb(null, newFilename);
            },
        });

        const upload = multer({ storage: storage }).single('file');

        upload(req, res, function (err) {
            if (err) {
                logger.error("upload function:", err);
                return res.json({ success: false, status: 500, message: "Internal server error", response: [] });
            }
            const originalFilename = req.file.originalname;
            const newFilename = req.file.filename;

            return res.json({
                success: true, status: 200, message: "File uploaded successfully", response: { originalFilename, newFilename },
            });
        });
    }


    catch (error) {
        console.log("error file upload>>>>>>",error);
        logger.error(error);
        return res.json({ status: 500, message: 'Internal server error', success: false, response: null })
    }
}
