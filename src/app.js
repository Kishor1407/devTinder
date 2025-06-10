const express = require('express');

const app = express(); 


app.use("/test",(req,res) => {
    res.send("Hello from the server Test!");

})


app.get("/user", (req,res)=>{
    res.send({firstName:"Kishor", lastName:"Hegge"});
});

app.post("/user", (req,res)=>{
    console.log("Data Posted Successfully")
    res.send("Data Sent Successfully");
});

app.delete("/user", (req,res)=>{
    console.log("Data Deleted Successfully")
    res.send("Data Deleted Successfully");
});

// app.use("/",(req,res) => {
//     res.send("Hello from the server Home / !");

// })

// app.use("/hello",(req,res) => {
//     res.send("Hello from the server Hello!");

// })



app.listen(8000 , ()=>{
    console.log("Server is successfully listening on port 8000....");
});