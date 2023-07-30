const { ConnectionClosedEvent } = require("mongodb");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Service = require("../models/Service");
const User = require("../models/User");

const router = require("express").Router();

//CREATE CART

router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/addtocart/:ProductId/:CartId", async(req,res)=>{
//     try {

//         const cart = await Cart.find({CartId: req.params.id});
//         cart.products.push({ProductId});
//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })
// GET ALL CARTS
router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user.isAdmin) {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } else {
      res.send("you are not aunthenticated");
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gettotal/:id", async (req, res) => {
  try {
    const carts = await Cart.aggregate([
      { $addFields: { totalsum: { $sum: "$products.price" } } },
      { $out: "carts" },
    ]);
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE CART

router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/clearthecart/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          products: [],
          totalsum: 0,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/addtocart/:id", async (req, res) => {
  try {
    const productID = req.body.productID;
    let product = 0;
    product = await Service.findById(productID).exec();
    let isService = 0;
    if (!product) {
      isService = 1;
      product = await Product.findById(productID);
    }

    let newPrice = 0;
    const price = product.price;
    const quantity = req.body.quantity;
    if (isService == 1) {
      if (price > 1000 && price <= 5000) {
        newPrice = 0.12 * price + price;
      } else if (price > 8000) {
        newPrice = 0.18 * price + price;
      } else {
        newPrice = 200 + price;
      }
    } else {
      if (price > 1000 && price <= 8000) {
        9;
        newPrice = 0.1 * price + price;
      } else if (price > 8000) {
        newPrice = 0.15 * price + price;
      } else {
        newPrice = 100 + price;
      }
    }

    const cart = await Cart.findById(req.params.id).exec();
    const totalsumprice = cart.totalsum + quantity * newPrice;
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          products: {
            productId: productID,
            quantity: quantity,
            price: newPrice,
          },
        },
        $set: {
          totalsum: totalsumprice,
        },

        // $set :{ totalsum : price}
      },
      { new: true }
    );

    //  updatedCart.products.price=updatedCart.products.price+price;
    //  console.log(updatedCart.products["price"])
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/removefromcart/:id", async (req, res) => {
  try {
    const productID = req.body.productID;
    let product = 0;
    product = await Service.findById(productID).exec();
    if (!product) {
      product = await Product.findById(productID);
    }
    const price = product.price;
    const quantity = req.body.quantity;
    const cart = await Cart.findById(req.params.id).exec();
    const totalsumprice = cart.totalsum - quantity * price;
    // console.log(price);
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          products: {
            productId: productID,
          },
        },
        $set: {
          totalsum: totalsumprice,
        },

        // $set :{ totalsum : price}
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
