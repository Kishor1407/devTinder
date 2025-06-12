const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
  firstName: {
    type: String,
    required: true,
    minLength:4,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    lowercase:true,
    required: true,
    unique:true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: { 
    type: String,
    validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("Gender data is not valid");
        }
    }
  },
  photoUrl:{
    type:String,
  },
  about:{
    type:String,
    default:"I am Default of Default"
  },
  skills:{
    type:[String],
  }
},{
    timestamps:true,
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
