const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
  validateSignUpData(req);
  const { firstName, lastName, emailId, password, skills } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);
  const user = new User({
    firstName, 
    lastName,
    emailId,
    password: passwordHash,
    skills,
  });
  try {
    await user.save();
    res.send("User Added Successfully!!");
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
      res.cookie("token", token,{
        expires: new Date(Date.now() + 8 * 3600000)
      });

      res.send(" User Login Success");
    } else {
      throw new Error(" Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Errooor" + err.message);
  }
});

// authRouter.get('/');
module.exports = authRouter;
