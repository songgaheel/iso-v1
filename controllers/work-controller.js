const workCreate1 = (req, res, next) => {
    res.render("work-create-1", {
        data: {
            pageName: "สร้างทะเบียนงาน",
            message: "ISO Risk Evaluation Software",
        }
    });
}

const workCreate2 = (req, res, next) => {
    res.render("work-create-2", {
        data: {
            pageName: "กำหนดพื้นที่สำหรับทะเบียนงาน",
            message: "ISO Risk Evaluation Software",
        }
    });
}
const workCreate3 = (req, res, next) => {
    res.render("work-create-3", {
        data: {
            pageName: "กำหนดกิจกรรมในพื้นที่ภายใน",
            message: "ISO Risk Evaluation Software",
        }
    });
}
const workCreate4 = (req, res, next) => {
    res.render("work-create-4", {
        data: {
            pageName: "กำหนดกิจกรรมในพื้นที่ภายนอก",
            message: "ISO Risk Evaluation Software",
        }
    });
}
const workRegistration = (req, res, next) => {
    res.render("work-registration", {
        data: {
            pageName: "ข้อมูลทะเบียนงาน",
            message: "ISO Risk Evaluation Software",
        }
    });
}
module.exports.workCreate1 = workCreate1;
module.exports.workCreate2 = workCreate2;
module.exports.workCreate3 = workCreate3;
module.exports.workCreate4 = workCreate4;
module.exports.workRegistration = workRegistration;