const Post = require("../models/Post");

const ErrorResponse = require("../utils/errorResponse");

//POST post

exports.postingPost = async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      success: true,
      savedData: savedPost,
    });
  } catch (error) {
    return next(
      new ErrorResponse("There is post with same Title", 500)
    );
  }
};

//UPDATE post

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({
          success: true,
          savedData: updatedPost,
        });
      } catch (error) {
        next(error);
      }
    } else {
      return next(new ErrorResponse("You can update only your post!", 401));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE POST
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json({
          success: true,
          message: "Post has been deleted....",
        });
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      return next(new ErrorResponse("You can delete only your post!", 401));
    }
  } catch (error) {
    next(new ErrorResponse("Post has not deleted", 401));
  }
};

//GET POST

exports.getPosts=async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
      if (post !== null){
          res.status(200).json({
              success: true,
              posts: post,
          });
    }else{
        next(new ErrorResponse("No Posts are avaliable", 401));
    }
  } catch (error) {
    next(new ErrorResponse("No Post Found", 401));
  }
};


//GET ALL POSTS
exports.getAllPosts = async (req, res, next) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });GET
      posts = await Post.find();
    }
    if (posts !== null){
          res.status(200).json(posts);
    }else{

        next(new ErrorResponse("No Posts Found", 401));
    }
  } catch (err) {
    next(new ErrorResponse("No Posts Found", 401));
  }
};
