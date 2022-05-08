var express = require("express");
var router = express.Router();
const Post = require("../models/Post");

// Create a Post
router.post("/", async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId || req.body.isAdmin) {
      await post.updateOne({ $set: req.body });
      res.status(200).json(post);
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId || req.body.isAdmin) {
      await post.deleteOne();
      res.status(200).json(post);
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Like or dislike a post
router.put("/liked/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json(post);
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
