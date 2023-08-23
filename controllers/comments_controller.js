const Comment = require("../models/comment.js");
const Post = require("../models/post.js")

module.exports.create = function (req, res) {

    const post = req.body.post_id;
    //check if post exists
    Post.findById(post).then((post) => {

        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post_id,
                user: req.user._id
            }).then((data) => {
                //adding comment to post comment array
                post.comments.push(data);
                post.save();
                return res.redirect('/')
                console.log(data + " comment added successfully")
            }).catch((error) => {
                console.log(error);
                return res.redirect('/')

            })

        }
    })
}
module.exports.delete = function (req, res) {

    Comment.findByIdAndDelete(req.params.id)
    .then((comment) => {
        console.log( "comment deleted successfully");
        const postId = comment.post;
        Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id}})
    .then((post) => {
         console.log("comment id deleted successfully from post");
        return res.redirect('/');
    })
    .catch((error) => {
        console.log(error);
        return res.redirect('/');
    })
    })
    .catch((error) => {
        console.log(error);
        return res.redirect('/');
    })
    
    
}