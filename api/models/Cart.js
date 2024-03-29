const { Int32 } = require("mongodb");
const mongoose = require("mongoose");


const CartSchema = new mongoose.Schema(
    {
        userId: {
            type:String,
            required: true
        },
        totalsum:{
            type:Number,
            required:true
        },
        products: [
            {
                productId:{type:String}, 
                 quantity:{
                     type:Number,
                     default:1,
                 },
                price:{type:Number},
                isService:{type:Boolean},
                priceWithoutTax:{type:Number}

            },
        ],
        
    },
    {timestamps:true}      
);


module.exports = mongoose.model("Cart", CartSchema);