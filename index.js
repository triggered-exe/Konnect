const express = require("express");

const app = express();
const cookieParser = require('cookie-parser');
const db = require("./config/mongoose.js");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy.js");


app.use(cookieParser());
// for json
app.use(express.json())
// for form data
app.use(express.urlencoded({ extended: true }))

const port = 8000;
//using layouts 
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
//including static files
app.use(express.static("./assets"));

// extracting styles and scripts from sub pages to layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(session({
    name: "Konnect",
    //change me
    secret: "change",
    saveUninitialized: false,
    resave: false, 
    cookie: {
        maxAge: 1000*60*100 
    }
}))

app.use(passport.initialize());
app.use(passport.session());

//use express  router
app.use("/", require("./routes/index.js"));

//setting the view engine
app.set("view engine", "ejs");
app.set("views", "./views");




app.listen(port, (err) => {
    if (err) {
        console.log("Error: ", err);
    } else {
        console.log("This server is running on port:", port);
    }
}) 