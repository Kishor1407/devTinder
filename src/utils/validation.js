const validator = require('validator');


const validateSignUpData = (req)=>{
    const {firstName , lastName , emailId ,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }
    else if(
        firstName.length < 3 || firstName.length > 50
    ){
        throw new Error("First Name should be 4-50 Characters");

    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("Please Enter Strong Password")
    }
}

module.exports={
    validateSignUpData
}