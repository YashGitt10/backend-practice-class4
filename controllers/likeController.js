

const Post = require("../models/postModel");
const Like = require("../models/likeModel");


//like a post
exports.likePost = async(req, res) => {
    try {
        const {post, user} = req.body;
        const like = new Like({
            post,user
        });
        const savedLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true})
        .populate("likes").exec();
        res.status(200).json(
            {
                post:updatedPost
            }
        );
    } 
    catch (error) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                message:"error while creating like"
            }
        );
    }
}


//unlike a post
exports.unlikePost = async(req, res) => {
    try {
        const {post, like} = req.body;
        
        const deletedLike = await Like.findOneAndDelete({post: post, _id: like});

        const updatedPost = await Post.findByIdAndUpdate(post, {$pull : {likes: deletedLike._id}}, {new: true})

        res.status(200).json(
            {
                post:updatedPost
            }
        );
            
        
        
    } 
    catch (error) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                message:"error while creating like"
            }
        );
    }
}

// exports.dummyLink = async(req, res) => {
//     res.send("This is Dummy Page");
// }