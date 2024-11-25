const router = require("express").Router();
const { jobentryController } = require('../controllers/job/jobentry');
const { joblistController } = require('../controllers/job/joblist');
const { jobdetailsController } = require('../controllers/job/jobdetails');
const { jobPaymentController } = require('../controllers/job/jobpayment');
const { jobExpenseController } = require('../controllers/job/jobexpense')
const { jobreportController } = require('../controllers/job/jobreport');
const { jobNoGenController } = require('../controllers/job/jobNoGen');
const { invEmployeeBookController } = require('../controllers/job/invEmployeeBook');
const { equipmentsEmployeeDetailsController } = require('../controllers/job/equipmentsEmployeeDetails');
const { jobbookkeepingListController } = require('../controllers/job/jobbookkeepingList');
const { equipmentTableRemoveController } = require('../controllers/job/equipmentTableRemove');
const { jobbookkeepingListReportController } = require("../controllers/job/jobbookkeepingReport");
const authenticateToken = require('../middlewares/authenticateTokenUser');
module.exports = router;
router.post("/jobentry", authenticateToken, jobentryController);
router.post("/joblist", authenticateToken, joblistController);
router.post("/jobdetails", authenticateToken, jobdetailsController);
router.post("/paymentForJob", authenticateToken, jobPaymentController);
router.post("/expenseForJob", authenticateToken, jobExpenseController);
router.post("/joblistReport", authenticateToken, jobreportController);
router.post("/jobNoGen", authenticateToken, jobNoGenController);
router.post("/invEmployeeBook", authenticateToken, invEmployeeBookController);
router.post("/equipmentsEmployeeDetails", authenticateToken,equipmentsEmployeeDetailsController);
router.post("/jobbookkeepingList", authenticateToken, jobbookkeepingListController);
router.post("/equipmentTableRemove", authenticateToken, equipmentTableRemoveController);
router.post("/jobbookkeepingListReport", authenticateToken, jobbookkeepingListReportController)
