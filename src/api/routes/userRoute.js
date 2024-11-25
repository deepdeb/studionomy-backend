const router = require("express").Router();
const { registrationController } = require("../controllers/users/registration");
const { userLoginController } = require('../controllers/users/loginUser');
const { userDetailsController } = require('../controllers/users/userDetails');
const { userDetailsByEmailController } = require('../controllers/users/userDetailsByEmail');
const { userUpdateController } = require("../controllers/users/userUpdate");
const { updatePasswordController} = require("../controllers/users/updatePassword");
const { userlistController } = require('../controllers/users/userList');
const { profileShareController } = require('../controllers/users/profileShare');
const { searchUserController } = require('../controllers/users/searchUser');
const { updateOTPinDBController } = require("../controllers/users/updateOTPinDB");
const { checkAndChangePasswordController } = require("../controllers/users/checkAndChangePassword");
const authenticateToken = require('../middlewares/authenticateTokenUser');
const { userPublicInfoController } = require("../controllers/users/userPublicInfo");
module.exports = router;
router.post("/userRegistration", registrationController);
router.post("/userLogin", userLoginController);
router.post("/userUpdate", authenticateToken, userUpdateController);
router.post("/updatepassword", updatePasswordController);
router.post("/getUserDetails", authenticateToken, userDetailsController);
router.post("/getuserdetailsbyemail", userDetailsByEmailController);
router.post("/userList", userlistController);
router.post("/shareProfile", authenticateToken, profileShareController);
router.post("/searchUser", searchUserController);
router.post("/updateOTPinDB", updateOTPinDBController);
router.post("/checkAndChangePassword", checkAndChangePasswordController)
router.post("/userPublicInfo", userPublicInfoController)