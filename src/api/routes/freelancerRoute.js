const router = require("express").Router();
const { acceptPaymentController } = require("../controllers/freelancer/acceptPayment");
const { freelancerController } = require('../controllers/freelancer/freelancer');
const { getFreelancerEOPaymentByJobController } = require("../controllers/freelancer/freelancerEOPaymentByJob");
const { freelancerlistController } = require('../controllers/freelancer/freelancerlist');
const { getFreelancerRequestController } = require("../controllers/freelancer/freelancerRequest");
const { rejectPaymentController } = require("../controllers/freelancer/rejectPayment");
const { submitPaymentController } = require("../controllers/freelancer/submitPayment");

const authenticateToken = require('../middlewares/authenticateTokenUser');

router.post("/freelancerSubmit", authenticateToken, freelancerController);
router.post("/freelancerList", authenticateToken, freelancerlistController);
router.post("/freelancerRequest", authenticateToken, getFreelancerRequestController);
router.post("/submitPayment", submitPaymentController);
router.post("/freelancerEOPaymentByJob", getFreelancerEOPaymentByJobController)
router.post("/acceptPayment", acceptPaymentController)
router.post("/rejectPayment", rejectPaymentController)
module.exports = router;