const Post = require("../../../models/post");
const Comments = require("../../../models/comment");

module.exports.show = async function (req, res) {
  console.log(1);
  const posts = await Post.find({});
  return res.status(200).json({
    message: "List of posts",
    posts: posts,
  });
};
module.exports.delete = async function (req, res) {
  const userId = req.params.id;
  try {
    const post = await Post.findById(userId);
    if (post) {
      if(post.user == req.user.id ){
        Post.findByIdAndDelete(userId)
        .then(async (post) => {
          console.log(post.id)
          await Comments.deleteMany({ post: post._id });
          return res.status(200).json({
            message: "Post and associated comments deleted successfully",
            post: post,
          });
  
        })
      }else{
        return res.status(401).json({
          message: "You cannot delete this post",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error" + error,
    });
    
  }
};
