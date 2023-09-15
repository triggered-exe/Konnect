var mongoose = require('mongoose');
const env = require("./environment")
//Set up default mongoose connection
var mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true });
 //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open",()=>{
    console.log("connected to database")
})

module.exports = db;
