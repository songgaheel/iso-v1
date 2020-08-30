const express = require('express');
const router = express.Router();
const workEvalController = require("../controllers/work-eval-controller");
router
    .get("/work/evaluation", workEvalController.workevaluation)
    .get("/work/evaluation/create/1", workEvalController.workevalCreate1)
    .get("/work/evaluation/create/2", workEvalController.workevalCreate2)
    .get("/work/evaluation/create/3", workEvalController.workevalCreate3)
    .get("/work/evaluation/create/4", workEvalController.workevalCreate4)
    .get("/work/evaluation/create/5", workEvalController.workevalCreate5)
    .get("/work/evaluation/create/6", workEvalController.workevalCreate6)
    .get("/work/evaluation/create/7", workEvalController.workevalCreate7)
    .get("/work/evaluation/create/8", workEvalController.workevalCreate8)
    .get("/work/evaluation/create/9", workEvalController.workevalCreate9)
    .get("/work/evaluation/create/10", workEvalController.workevalCreate10)
    .get("/work/evaluation/create/11", workEvalController.workevalCreate11)
    .get("/work/evaluation/create/12", workEvalController.workevalCreate12)
    .get("/work/evaluation/create/13", workEvalController.workevalCreate13)
    .get("/work/evaluation/report/1", workEvalController.workevalReport1)
    .get("/work/evaluation/report/2", workEvalController.workevalReport2)
    .get("/work/evaluation/report/3", workEvalController.workevalReport3);

module.exports = router;