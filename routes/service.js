const Service = require("../models/Service");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../verifyToken");

const router = require("express").Router();

//CREATE Service
let newPrice=0;


router.post("/", async (req,res)=>{
   
    try {
        const priceService= req.body.price;
    
        
            if (priceService > 1000 && priceService <= 8000) {
              newPrice = 0.1 * priceService + priceService;
            } else if (priceService > 8000) {
              newPrice = 0.15 * priceService + priceService;
            } else {
              newPrice = 100 + priceService;
            }
        
         
        req.body.price=newPrice;
        const newService = new Service(req.body);
        const savedService = await newService.save();
        res.status(200).json(savedService);
    } catch (err) {
        res.status(500).json(err);
    }
})


//GET 
router.get("/find/:id", async(req,res)=>{
    try {
        const service = await Service.findById(req.params.id);
        res.status(200).json(product); 
    } catch (err) {
        res.status(500).json(err);
    }
} )


// GET ALL PRODUCTS
router.get("/", async(req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let services;
        if(qNew){
            services = await Service.find().sort({createdAt:-1}).limit(10);
        }
        else if(qCategory){
            services = await Service.find({categories:{
                $in: [qCategory],
            }})
        }
        else{
            services = await Service.find();
        }

        res.status(200).json(products); 
    } catch (err) {
        res.status(500).json(err);
    }
} )


//UPDATE
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    if(req.body.password){
        password = req.body.password;
    }
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            {
            $set: req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedService);
    } catch (err) {
        res.status(500).json(err);
    }
});


//DELETE

router.delete("/:id",verifyTokenAndAuthorization, async(req,res)=>{
    try {
        await Service.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted!"); 
    } catch (err) {
        res.status(500).json(err);
    }
} )


module.exports = router;