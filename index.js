const express = require("express");

const app = express();

const port = 8000;

app.use("/", require("./routes/index.js"));

app.listen(port, (err) => {
    if (err) {
        console.log("Error: ", err);
    } else {
        console.log("This server is running on port:", port);
    }
}) 