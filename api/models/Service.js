const mongoose = require("mongoose");


const ServicesSchema = new mongoose.Schema(
    {
        title: {type:String,required: true, unique:true},
        desc: {type:String,required: true, unique:true},
        img: {type:String,required: false},
        categories: {type:Array},
        size: {type:Array},
        color: {type:Array},
        price: {type:Number,required: true},
        inStock: {type:Boolean,default: true},

        
    },
    {timestamps:true}      
);


module.exports = mongoose.model("Services", ServicesSchema );