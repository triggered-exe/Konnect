const Comment = require("../models/comment.js");
const Post = require("../models/post.js");
const Likes = require("../models/likes.js");
const commentMailer = require("../mailers/comments_mailer.js");
// const queue = require("../config/kue.js")
const commentEmailWorker = require("../workers/comment_email_worker.js");

module.exports.create = function (req, res) {
  const post = req.body.post_id;
  //check if post exists
  Post.findById(post).then((post) => {
    if (post) {
      Comment.create({
        content: req.body.content,
        post: req.body.post_id,
        user: req.user._id,
        likes: []
      })
        .then((data) => {
          //adding comment to post comment array
          post.comments.push(data);
          post.save();
          Comment.findById(data._id)
            .populate("user")
            .then((comment) => {
              // console.log( " comment added successfully");
              //sending mail to user about new comment
              commentMailer.newComment(comment);
              console.log("comment email worker working"+ comment)
              // using queue
              //   let job = queue.create("emails", comment).save(function (err) {
              //   if (err) {
              //     console.log("error in creating a queue");
              //     return;
              //   }
              //   console.log("job enqueued successfully: "+ job.id);
              //   return;
              // })
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
    .then(async (comment) => {
      console.log("comment deleted successfully");
      // delete all likes associated with the comment
      await Likes.deleteMany({likeable: comment.id, onModel: "Comment" } );
      console.log("likes of the comments deleted")
      const postId = comment.post;
      Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id, onModel: "Comment" },
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
