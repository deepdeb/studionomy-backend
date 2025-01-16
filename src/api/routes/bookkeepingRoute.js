const router = require("express").Router();
const { bookkeepingListController } = require('../controllers/bookkeeping/bookkeepingList');
const { bookkeepingSubmitController } = require('../controllers/bookkeeping/bookkeepingSubmit');
const { bookkeepingListReportController } = require('../controllers/bookkeeping/bookkeepingReport');
const authenticateToken = require('../middlewares/authenticateTokenUser');
module.exports = router;
router.post("/bookkeepingList", authenticateToken, bookkeepingListController);
router.post("/bookkeepingSubmit", authenticateToken, bookkeepingSubmitController);
router.post("/bookkeepingListReport", authenticateToken, bookkeepingListReportController);