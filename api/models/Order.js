const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        
        amount: { type: Number, default:0 },
        address: { type: Object, required: true },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
);


module.exports = mongoose.model("Order", OrderSchema);