const router = require("express").Router();
const { stateController } = require('../controllers/common/state');
const { equipmentCategoryController } = require('../controllers/common/equipmentCategory');
const { equipmentSubCategoryController } = require('../controllers/common/equipmentSubCategory');
const { brandController } = require('../controllers/common/brand');
const { dashboardController } = require('../controllers/common/dashboard');
const { fileuploadController } = require('../controllers/common/fileupload');
const { imageuploadController } = require("../controllers/common/imageupload");
const { commonDeleteController } = require('../controllers/common/commonDelete');
const { sendMailController } = require('../controllers/common/sendMail')
const { quotationController } = require('../controllers/common/quotation');
const { quoteNoGenController } = require("../controllers/common/quoteNoGen");
const { quotationlistController } = require('../controllers/common/quotationList')
const { quotationpdfController } = require('../controllers/common/quotationpdf')
const { quotationByQuoteNumController } = require('../controllers/common/quotationByQuoteNum')
const authenticateToken = require('../middlewares/authenticateTokenUser');
const { quotepdfController } = require("../controllers/common/quotePdf");
const { quotationreportController } = require("../controllers/common/quotationReport");
const { quotePuppeteerController } = require("../controllers/common/quotePuppeteer");
module.exports = router;
router.get("/stateList", stateController);
router.get("/equipmentCategoryList", equipmentCategoryController);
router.post("/equipmentSubCategoryList", equipmentSubCategoryController);
router.get("/brandList", brandController);
router.get("/dashboardCount", dashboardController);
router.post("/fileupload", fileuploadController);
router.post("/imageupload", imageuploadController)
router.post("/delete",authenticateToken, commonDeleteController);
router.post("/sendmail",sendMailController);
router.post("/quotationentry",authenticateToken, quotationController);
router.post("/quoteNoGen", authenticateToken, quoteNoGenController)
router.post("/quotationlist", authenticateToken, quotationlistController);
// router.post("/quotationpdf", authenticateToken, quotationpdfController);
// router.post("/quotationPdf",authenticateToken, quotepdfController);
router.post("/quotationPdf", authenticateToken, quotePuppeteerController);
router.post("/quotationbyquotenum", authenticateToken, quotationByQuoteNumController);
router.post("/quotationReport", authenticateToken, quotationreportController);
