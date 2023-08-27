const Post = require("../models/post.js");
const Comment = require("../models/comment.js");

module.exports.create = function (req, res) {
    console.log(req.body)
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then(async (newPost) => {
        // req.flash("success", "Post added successfully");

        console.log("post added successfully")
        // Populate the user field
       const populatedPost = await Post.findById(newPost._id).populate('user');
        res.status(201).json(populatedPost);
    })
    .catch((error)=>{
        // req.flash("error", "Error while adding post");
        console.log(error)
        res.status(500).json({ message: 'Error deleting post' });
    })
}


module.exports.delete = async function (req, res) {
    console.log(req.params.id)
    Post.findByIdAndRemove(req.params.id)
        .then((post) => {
            //check whether the post id match signed in user id or not
            if (post.user == req.user.id) {
                //deleting all the comments associated with the post
                Comment.deleteMany({ post: req.params.id })
                    .then(async (post) => {
                        // req.flash("success", "Post and comments deleted successfully")
                        console.log("post and comments deleted successfully");
                        console.log(req.params.id)
                       return res.status(200).json(req.params.id);
                    })
            } else {
                return res.redirect('back');
            }
        })
        .catch((error)=>{
            // req.flash("error", "Error while deleting post");
            console.log(error)
            res.status(500).json({ message: 'Error deleting post' });
        })
    }
        
   