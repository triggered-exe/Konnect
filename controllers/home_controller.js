const Post = require("../models/post");
const User = require("../models/user");
const env = require("../config/environment");

module.exports.home = function (req, res) {
  //populating ther user fiels with the object id it was referenced to
  Post.find()
    .populate("user")
    //find the comments of each post and populate the user field with the object id it was referenced to
    .populate({
      path: "comments",
      populate: [
        { path: "likes", populate: { path: "user" } }, // Populating comment likes and user field
        { path: "user" }, // Populating the user field in comments
      ],
      sort: { createdAt: -1 },
    })
    .populate({
      path: "likes",
      populate: { path: "user" }, // Populating the user field in the likes
    })

    .sort({ createdAt: -1 })
    .then((posts) => {
      //find all the user and return them
      User.find({}).then((users) => {
        // Determine the server URL based on the environment
        const serverURL =
          env.name === "production"
            ? "https://konncect-env.eba-bgy9kheh.ap-south-1.elasticbeanstalk.com"
            : "http://localhost:5000"; // Development server URL
        //return an array of objects posts
        return res.render("home", {
          posts: posts,
          all_users: users,
          serverURL:serverURL
        });
      });
    });
};
