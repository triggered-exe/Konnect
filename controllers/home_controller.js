const Post = require("../models/post");

module.exports.home = function (req, res) {
   //populating ther user fiels with the object id it was referenced to
   Post.find()
      .populate("user")
      //find the comments of each post and populate the user field with the object id it was referenced to
      .populate({
         path: "comments",
         populate: {
            path: "user"
         }
      })
      .exec()
      .then((posts) => {
         //return an object 
         return res.render("home", {
            posts: posts
         });
      })

} 