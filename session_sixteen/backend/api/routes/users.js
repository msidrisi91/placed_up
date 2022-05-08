var express = require("express");
var router = express.Router();

const User = require("../models/User");

// Update User
router.put("/:id", async (req, res, next) => {
  if (req.params.id === req.body.userId || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Delete User
router.delete("/:id", async (req, res, next) => {
  if (req.params.id === req.body.userId || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Get User
router.get("/", async (req, res, next) => {
  const userId = req.query.userId;
  try {
    const user = await User.findById(userId);
    const { password, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get Following

router.get("/following/:id", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    var following_user = user.following.map(async (followid) => {
      const f_user = await User.findById(followid);
      const { password, email, createdAt, isAdmin, ...f_userData } =
        f_user._doc;
      return f_userData;
    });

    res.status(200).json(following_user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/followers/:id", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    var follower_user = user.followers.map(async (followid) => {
      const f_user = await User.findById(followid);
      const { password, email, createdAt, isAdmin, ...f_userData } =
        f_user._doc;
      return f_userData;
    });

    res.status(200).json(follower_user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Follow User
router.put("/follow/:id", async (req, res, next) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({
          $push: { followers: currentUser._id },
        });
        await currentUser.updateOne({
          $push: { following: user._id },
        });
        res.status(200).json({ message: "Followed" });
      } else {
        res.status(200).json({ message: "Already Followed" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(401).json({ error: "You cant follow yourself" });
  }
});

// Unfollow User

router.put("/unfollow/:id", async (req, res, next) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(currentUser._id)) {
        await user.updateOne({
          $pull: { followers: currentUser._id },
        });
        await currentUser.updateOne({
          $pull: { following: user._id },
        });
        res.status(200).json({ message: "Unfollowed" });
      } else {
        res.status(200).json({ message: "Already Unfollowed" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(401).json({ error: "You cant unfollow yourself" });
  }
});

module.exports = router;
