const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const authRoute = require("./routes/auth");
const homeController = require("./controllers/home-controller");
const workRoute = require("./routes/work");
const workEvalRoute = require("./routes/workEval");
const workInRoute = require("./routes/workIn");
const companyRoute = require("./routes/comps");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const corsOptions = {
    origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res, next) => {
    const sess = req.session;
    if (sess.username) {
        return res.redirect('/home');
    }
    res.redirect('/login');
});
app.use(authRoute);
app.use(workRoute);
app.use(workEvalRoute);
app.use(workInRoute);
app.use(companyRoute);
app.get("/home", homeController.home);


const port = process.env.port || 5000;
app.listen(port, function() {
    console.log('Listenning on port: ', port);
});