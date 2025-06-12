const express = require("express");
const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Successfully!!");
  } catch (err) {
    res.status(400).send("Error Error Error");
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

//FIND user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    // const user = await User.findOne({ emailId: userEmail });

    if (user.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }
});

//Feed API - all Users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!!!!!");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log("User ID received:", req.body.userId);


  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User Deleted Successfully");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(400).send("Something went wrong!!!");
  }
});


app.patch("/user/:userId", async (req,res)=>{
  const userId = req.params?.userId;
const data =req.body;

const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];

const isUpdateAllowed = Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k)
);
if(!isUpdateAllowed){
    res.status(400).send("Error Error Error")
}
if(data?.skills.length>0){
    res.status(400).send("Skills Error Error")

}  
  try {
     const user =  await User.findByIdAndUpdate({_id : userId} , data , {returnDocument:"after",runValidators:true});
     console.log(user);
     
      res.send("User Updates Successfully")
  } catch (err) {
    console.error("Error:", err);
    res.status(400).send("Something went wrong!!!");
  }

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
