const express = require("express");

const app = express();
const cookieParser = require('cookie-parser');
const db = require("./config/mongoose.js");

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
//setting the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// extracting styles and scripts from sub pages to layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);


app.use("/", require("./routes/index.js"));

app.listen(port, (err) => {
    if (err) {
        console.log("Error: ", err);
    } else {
        console.log("This server is running on port:", port);
    }
}) 