const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async(req, res, next) => {
  //Read token from req cookies
try{
  
  const {token} = req.cookies;
  if(!token){
    throw new Error("Token is Not Valid");
  }
  const decodedObj = await jwt.verify(token,"DEV@Tinder$790");
  const {_id}= decodedObj;
  const user = await User.findById(_id);
  if(!user){
    throw new Error("User Not Found");
  }
  req.user = user;
 next();
}catch(err){
  res.status(400).send("Error " + err.message)
}
}


module.exports={
     userAuth
}

// const adminAuth = (req, res, next) => {
//   //Logic of Fetching Data
//   // It should be authorised
//   console.log("Adin auth is checkeding ");
//   const token = "xyz";
//   const isAdminAuthDone = token === "xyz";
//   if (isAdminAuthDone) {
//     next();
//   } else {
//     res.status(401).send("Unauthrosied Result");
//   }
// }



// const userAuth = (req, res, next) => {
//   Logic of Fetching Data
//   It should be authorised
//   console.log("Adin auth is checkeding ");
//   const token = "xyz";
//   const isAdminAuthDone = token === "xyz";
//   if (isAdminAuthDone) {
//     next();
//   } else {
//     res.status(401).send("Unauthrosied Result");
//   }
// }

