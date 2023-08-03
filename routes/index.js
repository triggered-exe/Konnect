const express = require("express");
const router = express.Router();

//returns the exports object
let home_controller = require("../controllers/home_controller.js");
console.log("router is running");

router.get("/",home_controller.home);

module.exports = router;