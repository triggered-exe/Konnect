const Post = require("../models/post.js");

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then((data)=>{
        console.log("post added successfully")
        return res.redirect('back');
    })
}
