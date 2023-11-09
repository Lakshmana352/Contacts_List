const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: [true, "Username is mandatory."]
    },
    email:{
        type:String,
        required: [true, "email is mandatory."],
        unique: [true, "Email already exits."]
    },
    password:{
        type:String,
        required: [true, "Password is mandatory."]
    }
},{
    timestamps: true,
})


module.exports = mongoose.model("Users",userSchema);