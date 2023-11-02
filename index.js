const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const env = require("./config/environment");
const PORT = env.PORT || 8000;
const cookieParser = require('cookie-parser');
const db = require("./config/mongoose.js");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy.js");
const passportJWT = require("./config/passport-jwt-strategy.js");
const passportGoogle = require("./config/passport-google-oauth2-strategy.js");
const path = require("path");
const { Server } = require('socket.io');
const {chatServerListener} = require("./config/chat_server_listener.js");

const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware.js");


app.use(cookieParser());
// Increase request size limits
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


//using layouts 
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
//including static files
app.use(express.static(env.assets_path));
app.use("/uploads", express.static("./uploads"));


// extracting styles and scripts from sub pages to layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting the view engine
app.set("view engine", "ejs");
app.set("views", "./views");


//MongoStore is used to store the session cookie in the db
app.use(session({
    name: "Konnect",
    //change me
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    },
    //to store session in the mongodb database instead server memory
    store: MongoStore.create(
        {
            mongoUrl: env.MONGO_URL,
            autoRemove: "enabled"
        },
        function (error) {
            console.log(error || `connect-mongodb setup ok`);
        }
    )

}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use flash as middleware
app.use(flash());
//passing the message to the fash usind middleware
app.use(customMware.setFlash);

//use express  router
app.use("/", require("./routes/index.js"));


const expressServer = app.listen(PORT, (err) => {
    if (err) {
        console.log("Error: ", err);
    } else {
        console.log("This Server is running on PORT:", PORT);
    }
}) 


//  setup the char server using socket.io

const io = new Server(expressServer, {
    // cors: {
    //     origin:[
    //         "https://konncect-env.eba-bgy9kheh.ap-south-1.elasticbeanstalk.com",
    //         "http://konncect-env.eba-bgy9kheh.ap-south-1.elasticbeanstalk.com",
    //         "https://konnect-odr1.onrender.com:10000",
    //         "https://konnect-odr1.onrender.com",
    //         "http://localhost:8000",
    //         "http://127.0.0.1:8000"
    //     ],
    //     methods: ["GET", "POST"],
    // }
})

chatServerListener(io);