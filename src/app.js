const express = require("express");

const app = express();


// const { adminAuth, userAuth } = require("./middlewares/auth");

// app.use("/admin", adminAuth);

// if we want to do auth and send response on each call we cant write condition in every routeHabdlers so thts why w ehave middlewares

app.use("/", (err, req, res) => {
 if(err){
    //Log errors
     res.status(500).send("Something went wrong");  
 }
});

app.get("/admin/getAllData", (req, res) => {
  try{
    throw new Error("sdf");
    res.send("USERRRR")
  }
  catch(err){
    res.status(500).send("ERROR");
  }
});

app.listen(8000, () => {
  console.log("Server is successfully listening on port 8000....");
});


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
