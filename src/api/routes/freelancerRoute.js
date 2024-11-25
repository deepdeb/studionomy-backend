const router = require("express").Router();
const { freelancerController } = require('../controllers/freelancer/freelancer');
const { freelancerlistController } = require('../controllers/freelancer/freelancerlist');
const authenticateToken = require('../middlewares/authenticateTokenUser');
router.post("/freelancerSubmit", authenticateToken, freelancerController);
router.post("/freelancerList", authenticateToken, freelancerlistController);
module.exports = router;