const mongoose = require("mongoose");
const Contact = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone: {
        type:String
    },
    user_id: {
        type:String,
        required:true,
        //ref:"User",
    }


});

module.exports = mongoose.model("contact",Contact);