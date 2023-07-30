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

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.password) {
    password = req.body.password;
  }
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
