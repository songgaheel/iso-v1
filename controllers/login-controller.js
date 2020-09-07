const bcrypt = require('bcrypt');

const UserSchema = require('../models/UserSchema');

const User = UserSchema.userModel;

async function login(req, res, next) {
    res.render("login", {
        data: {
            pageName: "Login",
            message: "กรุณาล๊อคอินเข้าสู่ระบบ",
            class: "alert alert-primary",
            loginStatus: false
        }
    });
};

async function auth(req, res, next) {
    const sess = req.session;
    const username = req.body.username;
    const password = req.body.password;
    const userdata = await User.findOne({ username: username });
    const resultHash = bcrypt.compare(password, userdata.password);
    resultHash.then(result => {
        console.log(result);
        if (result) {
            sess.username = username;
            res.redirect("/home");
        } else {
            res.send(result);
        }
    }).catch(err => {
        res.send(err);
    })

};


module.exports.login = login;
module.exports.auth = auth;