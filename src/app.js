const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  // console.log(req.body);
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

  //   const userObj = {
  //     firstName: "Virat",
  //     lastName: "Kumar",
  //     emailId: "Virat123@gmail.com",
  //     password: "Virat@123",
  //   };

  //   //Creating a new instance of user model
  //   const user = new User(userObj);
  //   try {
  //     user.save();
  //     res.send("User Added Successfully!!");
  //   } catch (err) {
  //     res.status(400).send("Error Error Error");
  //   }
});

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {

  try {

    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong Token!!!!!");
  }
});

app.post("/sendConnectionRequest",userAuth , async (req,res)=>{
    console.log("Sending a connection Request");
    const user=req.user;
    res.send(user.firstName  + "  Sent Connection Request !!");

})


connectDB()
  .then(() => {
    console.log("Database Connect Successfully");

    app.listen(8000, () => {
      console.log("Server is successfully listening on port 8000....");
    });
  })
  .catch((err) => {
    console.error("Database Connection Failed", err);
  });





//   Learning APi's
// const { adminAuth, userAuth } = require("./middlewares/auth");

// app.use("/admin", adminAuth);

// if we want to do auth and send response on each call we cant write condition in every routeHabdlers so thts why w ehave middlewares

// app.use("/", (err, req, res) => {
//  if(err){
//     //Log errors
//      res.status(500).send("Something went wrong");
//  }
// });

// app.get("/admin/getAllData", (req, res) => {
//   try{
//     throw new Error("sdf");
//     res.send("USERRRR")
//   }
//   catch(err){
//     res.status(500).send("ERROR");
//   }
// });

// app.get("/admin", (req, res, next) => {
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
// });

// app.get("/user", userAuth, (req, res, next) => {
//   res.send("All Users");
// });

// app.get("/admin/getAllData", (req, res, next) => {
//   res.send("All Data Sent");
// });

// app.get("/admin/deleteData", (req, res, next) => {
//   res.send("All Data 1 Deleted");
// });

// app.get("/admin/getAllData", (req,res,next)=>{
//     //Logic of Fetching Data
//     // It should be authorised
//     const token = "xyz";
//     const isAdminAuthDone = token ==="xyz";
//     if(isAdminAuthDone){
//     res.send("All Data Sent");

//     }else{
//         res.status(401).send("Unauthrosied Result")
//     }
// });

// app.get("/admin/deleteData", (req,res,next)=>{
//     //Logic of Fetching Data
//     const token = "xyz";
//     const isAdminAuthDone = token ==="xyz";
//     if(isAdminAuthDone){
//         res.send("All Data 1 Deleted");

//     }else{
//         res.status(401).send("Unauthrosied Result")
//     }
// });

// Route Handlers and Middlewares

// app.use("/user", rH1 , rH2, [rH3]);
// app.use("/user", rH1 , [rH2, rH3],rH4,[rH5]);
// app.use("/user", [rH1 , rH2, rH3]);

// app.use("/user",[(req,res, next) => {
//     // res.send("Hello from the server 1 Test!");
//     next();

// },(req,res, next) => {
//     res.send("Hello from the server 2 Test!");
//     next();

// }],(req,res, next) => {
//     res.send("Hello from the server 3 Test!");
//     next();

// },)

// app.get("/user", (req,res)=>{
//     res.send({firstName:"Kishor", lastName:"Hegge"});
// });

// app.post("/user", (req,res)=>{
//     console.log("Data Posted Successfully")
//     res.send("Data Sent Successfully");
// });

// app.delete("/user", (req,res)=>{
//     console.log("Data Deleted Successfully")
//     res.send("Data Deleted Successfully");
// });

// app.use("/",(req,res) => {
//     res.send("Hello from the server Home / !");

// })

// app.use("/hello",(req,res) => {
//     res.send("Hello from the server Hello!");

// })



// Learning API'S
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const user = await User.find({ emailId: userEmail });
//     // const user = await User.findOne({ emailId: userEmail });

//     if (user.length === 0) {
//       res.status(404).send("User Not Found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong!!");
//   }
// });
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(400).send("Something went wrong!!!!!");
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   console.log("User ID received:", req.body.userId);

//   try {
//     const user = await User.findByIdAndDelete(userId);
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     res.send("User Deleted Successfully");
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(400).send("Something went wrong!!!");
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;

//   const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

//   const isUpdateAllowed = Object.keys(data).every((k) =>
//     ALLOWED_UPDATES.includes(k)
//   );
//   if (!isUpdateAllowed) {
//     res.status(400).send("Error Error Error");
//   }
//   if (data?.skills.length > 0) {
//     res.status(400).send("Skills Error Error");
//   }
//   try {
//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     console.log(user);

//     res.send("User Updates Successfully");
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(400).send("Something went wrong!!!");
//   }
// });
