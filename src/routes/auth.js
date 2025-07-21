const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  validateSignUpData(req);
  const { firstName, lastName, emailId, password, age, gender, about, photoUrl, skills } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);
  const user = new User({
    firstName,
    lastName,
    emailId,
    age,
    gender,
    about,
    photoUrl,
    password: passwordHash,
    skills,
  });
  try {
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });


    res.send({message:"User Added Successfully!!",data:savedUser});
  } catch (err) {
    res.status(400).send("Error Error Error" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordvalid = await user.validatePassword(password);

    if (isPasswordvalid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send(user);
    } else {
      throw new Error(" Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Errooor" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Success!!");
});

// authRouter.get('/');
module.exports = authRouter;
