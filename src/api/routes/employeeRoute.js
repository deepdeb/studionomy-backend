const router = require("express").Router();
const { employeeController } = require('../controllers/employee/employee');
const { employeelistController } = require('../controllers/employee/employeelist');
const { employeeAttendanceListController } = require('../controllers/employee/employeeAttendanceList');
const { employeeAttendanceController } = require('../controllers/employee/employeeAttendance');
const { employeeAttendanceListReportController } = require('../controllers/employee/employeeAttendanceReport');
const { employeelistReportController } = require('../controllers/employee/employeeReport');
const { employeeAttendanceByDateController } = require('../controllers/employee/employeeAttendanceByDate')
const authenticateToken = require('../middlewares/authenticateTokenUser');
module.exports = router;
router.post("/employeeSubmit", authenticateToken, employeeController);
router.post("/employeeList", authenticateToken, employeelistController);
router.post("/employeeAttendance", authenticateToken, employeeAttendanceController);
router.post("/employeeAttendanceList", authenticateToken, employeeAttendanceListController);
router.post("/employeeAttendanceListReport", authenticateToken, employeeAttendanceListReportController);
router.post("/employeeListReport", authenticateToken, employeelistReportController);
router.post("/employeeAttendanceByDate", authenticateToken, employeeAttendanceByDateController);