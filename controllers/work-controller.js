const UserSchema = require('../models/UserSchema');
const CompanySchema = require('../models/CompanySchema');
const DepartmentSchema = require('../models/DepartmentSchema');
const AreaSchema = require('../models/AreaSchema');
const ActivitySchema = require('../models/ActivitySchema');
const WorkSchema = require('../models/WorkSchema');

const User = UserSchema.userModel;
const Company = CompanySchema.CompanyModel;
const Department = DepartmentSchema.DepartmentModel;
const Area = AreaSchema.AreaModel;
const Activity = ActivitySchema.ActivityModel;
const Work = WorkSchema.workModel;

async function workCreate1(req, res, next) {
    const sess = req.session;
    if (sess.username) {
        const username = sess.username;
        const userData = await User.findOne({ username: username });
        const companyData = await Company.find({})
            .populate('departments');

        res.render("work-create-1", {
            data: {
                pageName: "สร้างทะเบียนงาน",
                message: "ISO Risk Evaluation Software",
                user: {
                    name: userData.name,
                    surname: userData.surname,
                    _id: userData._id,
                },
                company: companyData
            }
        });
    } else { res.redirect('/login'); }
}

async function workCreate2(req, res, next) {
    const data = req.body;
    const username = req.session.username;
    const createDate = Date.now();
    const userData = await User.findOne({ username: username });
    const work = Work({
        name: data.name,
        company: data.company,
        department: data.department,
        user: userData._id,
        progress: '1',
        createDate: createDate

    });
    await work.save();
    const departmentData = await Department.findOne({ _id: data.department })
        .populate('areas');
    res.render("work-create-2", {
        data: {
            pageName: "กำหนดพื้นที่สำหรับทะเบียนงาน",
            message: "ISO Risk Evaluation Software",
            department: departmentData,
            work: work
        }
    });
}
async function workCreate3(req, res, next) {
    const data = req.body;
    const work = req.body.work;
    const insideAreas = req.body.insideAreas;
    const outsideAreas = req.body.outsideAreas;
    const inside = {
        areas: insideAreas
    }
    const outside = {
        areas: outsideAreas
    }
    console.log(work);
    console.log(insideAreas);
    console.log(outsideAreas);
    console.log(inside);
    console.log(outside);

    const Updatework = await Work.updateOne({ _id: work }, {
        progress: '2',
        insideAreas: inside,
        outsideAreas: outside
    });

    const workFind = await Work.findOne({ _id: work })
        .populate('user')
        .populate('company')
        .populate('department')
        .populate({
            path: 'insideAreas',
            populate: { path: 'areas' }
        })
        .populate({
            path: 'outsideAreas',
            populate: { path: 'areas' }
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