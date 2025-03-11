const mongoose = require ("mongoose");

//schma
const userSchma = new mongoose.Schema({
    userName:{
        type: String,
        required:[true]
    },
    email:{
        type:String,
        required:[true],
        unique:true
    
    },
    password:{
        type:String,
        required:[true],
        unique:true
    },
    address:{
        type:String,
        required:[true]
    },
    phone:{
        type:String,
        require: [true]
    },
    userType:{
        type:String,
        require:[true],
        default: 'clinet',
        enum:['clinet','admin','vendor','driver']
    },
    profile:{
        type:String
    },
    answer:{
        type:String,
        required:[true]
    }
    
});
module.exports = mongoose.model("User",userSchma);