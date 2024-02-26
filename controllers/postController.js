


const Post = require("../models/postModel");
//const Comment = require("../models/commentModel");


exports.createPost = async(req, res) => {
    try {
        const {title,body} = req.body;
        const post = new Post({
            title,body,
        });
        const savedPost = await post.save();
        res.status(200).json(
            {
                post:savedPost,
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

exports.getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.status(200).json(
            {
                posts,
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