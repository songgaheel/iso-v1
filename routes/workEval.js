const express = require('express');
const router = express.Router();
const workEvalController = require("../controllers/work-eval-controller");
router
    .get("/work/evaluation", workEvalController.workevaluation)
    .get("/work/evaluation/create/1", workEvalController.workevalCreate1)
    .get("/work/evaluation/create/2", workEvalController.workevalCreate2);

module.exports = router;