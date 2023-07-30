const Order = require("../models/Order");
const Cart = require("../models/Cart");


const router = require("express").Router();

// //CREATE ORDER

router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const cart = await Cart.findOne({ userId: req.body.userId });
    console.log(cart?.totalsum);
    newOrder.amount = cart.totalsum;

    const savedOrder = await newOrder.save();
  //  res.send("Order placed");
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET USER ORDER

// router.get("/find/:userId",  async (req, res) => {
//     try {
//         const orders = await Order.find({ userId: req.params.userId });
//         res.status(200).json(orders);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

router.get("/bill/:userId", async (req, res) => {
  try {
    const carts = await Cart.aggregate([
        { $addFields: { totalsum: { $sum: "$products.price" } } },
        { $out: "carts" },
      ]);
    const orders = await Order.findOne({ userId: req.params.userId });
    const cart = await Cart.findOne({ userId: req.params.userId });
    orders.amount=cart.totalsum;
    
   // console.log(orders);
   // console.log(carts);
    let arr = [{ orders, cart }];
    console.log(arr);
    res.status(200).json(arr);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //UPDATE ORDER

router.put("/:id",  async (req, res) => {
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

router.delete("/:id",  async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
