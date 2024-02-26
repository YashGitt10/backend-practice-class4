

const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async(req, res) => {
    try {
        const {post, user, body} = req.body;
        //create a comment obj
        const comment = new Comment({
            post,user,body
        });
        //saving the new comment in db
        const savedComment = await comment.save();

        //find the corresponding postID and add the new comment in the comment array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new: true})
        .populate("comments").exec();
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
                message:"error while creating comment"
            }
        );
    }
}