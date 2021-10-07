const express = require("express");
const router = express.Router();

const {
  postingPost,
  updatePost,
  deletePost,
  getPosts,
  getAllPosts,
} = require("../controllers/post");

router.route("/").post(postingPost);
router.route("/:id").put(updatePost);
router.route("/:id").delete(deletePost);
router.route("/:id").get(getPosts);
router.route("/").get(getAllPosts)


module.exports = router;
