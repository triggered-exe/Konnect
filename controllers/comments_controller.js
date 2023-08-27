const Comment = require("../models/comment.js");
const Post = require("../models/post.js");

module.exports.create = function (req, res) {
  const post = req.body.post_id;
  //check if post exists
  Post.findById(post).then((post) => {
    if (post) {
      Comment.create({
        content: req.body.content,
        post: req.body.post_id,
        user: req.user._id,
      })
        .then((data) => {
          //adding comment to post comment array
          post.comments.push(data);
          post.save();
          Comment.findById(data._id)
            .populate("user")
            .then((comment) => {
              console.log(data + " comment added successfully");
              return res.status(201).json(comment);
            });
        })
        .catch((error) => {
          // req.flash("error", "Error while adding comment");
          console.log(error);
          return res.status(500).json({ message: "Error adding comment" });
        });
    }
  });
};
module.exports.delete = function (req, res) {
  Comment.findByIdAndDelete(req.params.id)
    .then((comment) => {
      console.log("comment deleted successfully");
      const postId = comment.post;
      Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      }).then((post) => {
        // req.flash("success", "Comment deleted successfully");
        console.log("comment id deleted successfully from post");
        return res.status(200).json(req.params.id);
      });
    })
    .catch((error) => {
      // req.flash("error", "Error while deleting comment");
      console.log(error);
      return res.status(500).json({ message: "Error deleting comment" });
    });
};
