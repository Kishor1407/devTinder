const express = require("express");
const requestsRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

requestsRouter.post("/sendConnectionRequest",userAuth , async (req,res)=>{
    console.log("Sending a connection Request");
    const user=req.user;
    res.send(user.firstName  + "  Sent Connection Request !!");

})

module.exports = requestsRouter;

