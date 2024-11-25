const router = require("express").Router();
const { freelancerController } = require('../controllers/freelancer/freelancer');
const { freelancerlistController } = require('../controllers/freelancer/freelancerlist');
const { getFreelancerPaymentController } = require("../controllers/freelancer/freelancerPayment");

const authenticateToken = require('../middlewares/authenticateTokenUser');

router.post("/freelancerSubmit", authenticateToken, freelancerController);
router.post("/freelancerList", authenticateToken, freelancerlistController);
router.post("/freelancerPayment", authenticateToken, getFreelancerPaymentController)
module.exports = router;