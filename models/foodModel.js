const mongoose = require("mongoose");

//schma
const foodSchma = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true, "Food title is required"]
        },
        description:{
            type:String,
            required:[true, "food description is required"]
        },
        price:{
            type:Number,
            required:[true,"food price is require"]
        },
        foodTags:{
            type:String
        },
        category:{
            type:String
        },
        code:{
            type:String
        },
        isAvailable:{
            type:Boolean,
            default:true
        },
        resturant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Resturant"
        },
        rating:{
            type:Number,
            default:5,
            min: 1,
            max:5
        },
        ratingCount:{
            type:String,
        },

    });
module.exports = mongoose.model("food", foodSchma);