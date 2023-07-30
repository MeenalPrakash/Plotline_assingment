const Product = require("../models/Product");


const router = require("express").Router();

//CREATE PRODUCT
let newPrice=0;
router.post("/", async (req,res)=>{
   
    try {
        const priceProduct= req.body.price;
    
        
        if (priceProduct > 1000 && priceProduct <= 5000) {
          newPrice = 0.12 * priceProduct + priceProduct;
        } else if (priceProduct > 8000) {
          newPrice = 0.18 * priceProduct + priceProduct;
        } else {
          newPrice = 200 + priceProduct;
        }
    
     
           req.body.price=newPrice;

        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})



//GET 
router.get("/find/:id", async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
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
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt:-1}).limit(10);
        }
        else if(qCategory){
            products = await Product.find({categories:{
                $in: [qCategory],
            }})
        }
        else{
            products = await Product.find();
        }

        res.status(200).json(products); 
    } catch (err) {
        res.status(500).json(err);
    }
} )


//UPDATE
router.put("/:id",async (req,res)=>{
    if(req.body.password){
        password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
            ).toString();
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
            $set: req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});


//DELETE

router.delete("/:id", async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted!"); 
    } catch (err) {
        res.status(500).json(err);
    }
} )


module.exports = router;