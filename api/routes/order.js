const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../verifyToken");

const router = require("express").Router();

// //CREATE ORDER

router.post("/",  async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const cart = await Cart.findOne({userId: req.body.userId});
        console.log(cart?.totalsum);
        newOrder.amount= (cart.totalsum);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})


// //GET USER ORDER

router.get("/find/:userId",  async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/find/:userId",  async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
})


// //UPDATE ORDER

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});


// //DELETE



router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
})




module.exports = router;