const router = require("express").Router();
const { feedbackController } = require('../controllers/feedbackorquery/feedback');
const { ApprovedFeedbackListController } = require('../controllers/feedbackorquery/feedbacklist');
const { AllFeedbackListController } = require('../controllers/feedbackorquery/allFeedbackList');
const { queryController } = require('../controllers/feedbackorquery/query');
const { queryListController } = require('../controllers/feedbackorquery/queryList');
const { feedbackStatusController } = require('../controllers/feedbackorquery/feedbackStatus');

module.exports = router;
router.post("/addFeedback", feedbackController);
router.post("/addQuery", queryController);
router.post("/queryList", queryListController);
router.get("/approvedFeedbackList", ApprovedFeedbackListController);
router.post("/feedbackList", AllFeedbackListController);
router.post("/changeFeedbackStatus", feedbackStatusController);