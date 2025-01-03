const router = require("express").Router();
const { inventoryController } = require('../controllers/inventory/inventory');
const { inventoryListController } = require('../controllers/inventory/inventoryList');
const { equipmentListController } = require('../controllers/inventory/equipmentList');
const { inventoryListReportController } = require('../controllers/inventory/inventoryReport');
const { equipmentPublicInfoController } = require("../controllers/inventory/equipmentPublicInfo");
const { equipmentForRentListReportController } = require("../controllers/inventory/equipmentForRentReport");
const authenticateToken = require('../middlewares/authenticateTokenUser');
const { equipmentListForBookController } = require("../controllers/inventory/equipmentListForBook");
module.exports = router;
router.post("/inventorysubmit", authenticateToken, inventoryController);
router.post("/inventoryList", authenticateToken, inventoryListController);
router.post("/equipmentList", authenticateToken, equipmentListController);
router.post("/equipmentPublicInfo", equipmentPublicInfoController);
router.post("/inventoryListReport", authenticateToken, inventoryListReportController); 
router.post("/equipmentForRentListReport", authenticateToken, equipmentForRentListReportController);
router.post("/equipmentListForBook", equipmentListForBookController)
