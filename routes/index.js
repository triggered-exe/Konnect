const express = require("express");
const router = express.Router();


//returns the exports object
let homeController = require("../controllers/home_controller.js");

router.get("/", homeController.home);
router.use("/users", require("./users.js"));
router.use("/post", require("./post.js"));
router.use("/comment", require("./comment.js"));
router.use("/reset-password", require("./password.js")); 
router.use("/likes", require("./likes"));
router.use("/friends", require("./friends.js"));

router.use("/api", require("./api"));
console.log("router is running");

module.exports = router;