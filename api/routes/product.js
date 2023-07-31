const Product = require("../models/Product");

const router = require("express").Router();

//CREATE PRODUCT
let newPrice = 0;
router.post("/", async (req, res) => {
  try {
    const priceProduct = req.body.price;

    req.body.price = priceProduct;

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  

  try {
    let products;
    
      products = await Product.find();
    

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  const updatedprice=req.body.price;
  let newPrice=0;
  if (updatedprice > 1000 && updatedprice <= 5000) {
    newPrice = 0.12 * updatedprice + updatedprice;
  } else if (updatedprice > 8000) {
    newPrice = 0.18 * updatedprice + updatedprice;
  } else {
    newPrice = 200 + updatedprice;
  }
  
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          price: newPrice
        },
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
