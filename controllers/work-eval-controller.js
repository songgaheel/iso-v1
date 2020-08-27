const workevaluation = (req, res, next) => {
    res.render("work-evaluation", {
        data: {
            pageName: "สร้างทะเบียนงาน",
            message: "ISO Risk Evaluation Software",
        }
    });
}

const workevalCreate1 = (req, res, next) => {
    res.render("work-eval-create-1", {
        data: {
            pageName: "สร้างการประเมินงาน",
            message: "ISO Risk Evaluation Software",
        }
    });
}
const workevalCreate2 = (req, res, next) => {
    res.render("work-eval-create-2", {
        data: {
            pageName: "ความเสี่ยงในพื้นที่ของพื้นที่ภายใน",
            message: "ISO Risk Evaluation Software",
        }
    });
}

module.exports.workevaluation = workevaluation;
module.exports.workevalCreate1 = workevalCreate1;
module.exports.workevalCreate2 = workevalCreate2;