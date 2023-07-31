const Service = require("../models/Service");

const router = require("express").Router();

//CREATE Service
let newPrice = 0;

router.post("/", async (req, res) => {
  try {
    const priceService = req.body.price;

    req.body.price = priceService;
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(200).json(savedService);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
 

  try {
    let services;
    
      services = await Service.find();
    

    res.status(200).json(services);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          price: newPrice
        },
      },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
