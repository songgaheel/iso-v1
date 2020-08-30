const workInCreate = (req, res, next) => {
    res.render("work-instruction-create", {
        data: {
            pageName: "สร้างทะเบียนวิธีปฏิบัติงาน",
            message: "ISO Risk Evaluation Software",
        }
    });
}


module.exports.workInCreate = workInCreate;