const express = require("express");
const router = express.Router();


//returns the exports object
let homeController = require("../controllers/home_controller.js");

router.get("/",homeController.home);
router.use("/users", require("./users.js"));
router.use("/post", require("./post.js"));
router.use("/comment", require("./comment.js"));
console.log("router is running");

module.exports = router;