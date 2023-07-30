const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../verifyToken");

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
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
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
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gettotal/:id", async (req, res) => {
  try {
    const carts = await Cart.aggregate([
    {$addFields: {totalsum : {$sum: "$products.price"}}},
    {$out: "carts"}
    
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
router.put("/addtocart/:id", async (req, res) => {
  try {
    const productID = req.body.productID;
    // const product = await Product.findById(productID);
    // const price= product.price;
    const quantity = req.body.quantity;
    // console.log(price);
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          products: {
            productId: productID,
            quantity: quantity,
          },
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
router.put("/removefromcart/:id", async (req, res) => {
    try {
      const productID = req.body.productID;
      // const product = await Product.findById(productID);
      // const price= product.price;
      const quantity = req.body.quantity;
      // console.log(price);
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            products: {
              productId: productID
             
            },
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

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
