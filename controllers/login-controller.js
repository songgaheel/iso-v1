const login = (req, res, next) => {
    res.render("login", {
        data: {
            pageName: "Login",
            message: "กรุณาล๊อคอินเข้าสู่ระบบ",
            class: "alert alert-primary",
            loginStatus: false
        }
    });
};
module.exports.login = login;