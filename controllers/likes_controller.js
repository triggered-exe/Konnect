const Likes = require("../models/likes");
const Post = require("../models/post");
const Comment = require("../models/comment");


module.exports.toggleLike = async function(req, res){
    try {
        let likeable;
        console.log(req.body)
        let deleted = false;
        if(req.body.type === "Post"){
            likeable = await Post.findById(req.body.id).populate("likes");
            // console.log("likeable length",likeable);
            // console.log("likeable length",likeable.likes);
        }else{
            likeable = await Comment.findById(req.body.id).populate("likes");
        }
        // check if like already exist
        let existingLike = await Likes.findOne({
            user: req.user._id,
            likeable:req.body.id,
            onModel:req.body.type
        })
        // if a like already exist delete it else create one
        if(existingLike){

            console.log("like exists")

            likeable.likes.pull(existingLike.id);
            likeable.save();

            Likes.findByIdAndDelete(existingLike.id)
            .then((like)=>{
                console.log("like deleted successfully");
                deleted = true;
            })
            .catch((error)=>{
                console.log(error);
            })
           
        }else{
            let newLike = await Likes.create({
            user: req.user._id,
            likeable:req.body.id,
            onModel:req.body.type
            });
            console.log("like created successfully")
            console.log(likeable)
            likeable.likes.push(newLike._id);
            likeable.save();
            console.log("like save to models ")
        }

        return res.status(200).json({
            message: "request successful",
            data: {
                likesCount: likeable.likes.length,
                deleted: deleted
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
    }

}