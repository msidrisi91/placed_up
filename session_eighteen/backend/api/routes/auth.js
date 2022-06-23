const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);

    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = new User(req.body);
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    } else {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ error: "Login failed! Check authentication credentials" });
      } else {
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
