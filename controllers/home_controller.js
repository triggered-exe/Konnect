const Post = require("../models/post");
const User = require("../models/user");

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
      posts.forEach(element => {
         console.log(element.likes)
         console.log(element.likes.length)
      });
      //find all the user and return them
      User.find({}).then((users) => {
        //return an array of objects posts
        return res.render("home", {
          posts: posts,
          all_users: users,
        });
      });
    });
};
