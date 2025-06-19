const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum:{
        values:["male","female","others"],
        message: `{VALUE} is not valid gender type`
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fman&psig=AOvVaw2zJfKUYtPMiDWPYLvhs4Ad&ust=1749879532198000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIDx5rDX7Y0DFQAAAAAdAAAAABAE",
    },
    about: {
      type: String,
      default: "I am Default of Default",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser){
  const user = this;
  const PasswordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, PasswordHash);
  return isPasswordValid;
}

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
