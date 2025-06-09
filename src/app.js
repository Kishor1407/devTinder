const express = require('express');

const app = express(); 

app.use("/",(req,res) => {
    res.send("Hello from the server Home / !");

})

app.use("/hello",(req,res) => {
    res.send("Hello from the server Hello!");

})

app.use("/test",(req,res) => {
    res.send("Hello from the server Test!");

})

app.listen(8000 , ()=>{
    console.log("Server is successfully listening on port 8000....");
});