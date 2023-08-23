const Post = require("../models/post.js");
const Comment = require("../models/comment.js");

module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then((data) => {
        console.log("post added successfully")
        return res.redirect('back');
    })
}

module.exports.delete = function (req, res) {
    Post.findByIdAndRemove(req.params.id)
        .then((post) => {
            //check whether the post id match signed in user id or not
            if (post.user == req.user.id) {
                //deleting all the comments associated with the post
                Comment.deleteMany({ post: req.params.id })
                    .then(() => {
                        console.log("post and comments deleted successfully")
                        return res.redirect('back');
                    })
            } else {
                return res.redirect('back');
            }
        }
        )
        .catch((error)=>{
            console.log(error)
            return res.redirect('back');
        })
    }
        
   