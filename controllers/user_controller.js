const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModel");

const registerUser = asyncHandler(async(req,res)=>{
    const user = req.body;
    const {username,email,password} = user;
    if(!username || !email || !password){
        res.status(400).json({message:"Fill the required fields are mandatory."});
    }
    const search = await userSchema.findOne({email});
    if(search){
        res.status(400).json({message:"Email already exists."});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);
    const created = await userSchema.create({
        username,
        email,
        password: hashedPassword
    });
    res.status(200).json(created);
});

const loginUser = asyncHandler(async(req,res)=>{
    // res.status(200).json({message:"Login the user."})
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const user = await userSchema.findOne({email});
    // if(user && (await bcrypt.compare(password,user.password))){
    //     res.status(200).json(user);
    // }

    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN,{expiresIn:"15m"})

        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or Password is invalid. Re-enter Correctly.")
    }
})

const getDetails = asyncHandler(async(req,res)=>{
    res.json(req.user);
})

module.exports = {
    registerUser,
    loginUser,
    getDetails
};