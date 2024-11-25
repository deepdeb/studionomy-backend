const router = require('express').Router();
const userRoute = require('./userRoute');
const feedbackQueryRoute = require('./feedbackQueryRoute');
const subscriptionRoute = require('./subscriptionRoute');
const commonRoute = require('./commonRoute');
const jobRoute = require('./jobRoute');
const inventoryRoute = require('./inventoryRoute');
const employeeRoute = require('./employeeRoute');
const bookkeepingRoute = require('./bookkeepingRoute');
const freelancerRoute = require('./freelancerRoute');
const networkRoute = require('./networkRoute');

router.use("/user", userRoute);
router.use('/feedback', feedbackQueryRoute);
router.use('/query', feedbackQueryRoute);
router.use('/subscription', subscriptionRoute);
router.use('/common', commonRoute);
router.use('/job', jobRoute);
router.use('/inventory', inventoryRoute);
router.use('/employee', employeeRoute);
router.use('/bookkeeping', bookkeepingRoute);
router.use('/freelancer', freelancerRoute);
router.use('/network', networkRoute);

module.exports = router;