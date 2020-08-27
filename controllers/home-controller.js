const home = (req, res, next) => {
    res.render("home", {
        data: {
            pageName: "Home",
            message: "ISO Risk Evaluation Software",
        }
    });
}
module.exports.home = home;