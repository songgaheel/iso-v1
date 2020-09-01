const home = (req, res, next) => {
    res.render("company", {
        data: {
            pageName: "Home",
            message: "ISO Risk Evaluation Software",
        }
    });
}
module.exports.home = home;