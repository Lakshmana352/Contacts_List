const mongoose = require("mongoose");

const contactsSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required: [true, "User Id is required."],
        ref:"users"
    },
    name:{
        type: String,
        required: [true,"Name is required."]
    },
    email:{
        type: String,
        required: [true,"email is required."]
    },
    phone:{
        type: String,
        required:  [true,"Phone is required."]
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Contacts",contactsSchema);