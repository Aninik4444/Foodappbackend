const mongoose = require ("mongoose");

//schma
const orderSchma = new mongoose.Schema(
    {
     foods:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:"Foods"}
     ],
     payment:{},
     buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
     },
     status:{
        type:String,
        enum:["preparing","prepare","on the way","delived"],
            default:"preparing"
     },
     
        
     
    
    
});
module.exports = mongoose.model("order",orderSchma);