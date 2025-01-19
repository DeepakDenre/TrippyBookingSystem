const express = require("express");
const router = express.Router();2
const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const newUser = new User(req.body);
    const user = await newUser.save();

    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      res.send(temp);
    } else {
      return res.status(400).json({ message: "Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/deleteuser", async (req, res) =>{
  try {
    const user = await User.findByIdAndDelete(req.body.userid);
    res.send("User Deleted Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
} );

module.exports = router;
