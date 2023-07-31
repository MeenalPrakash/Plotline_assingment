const User = require("../models/User");


const router = require("express").Router();

//GET BY ID
router.get("/find/:id", async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const { password , ...info} = user._doc;

        res.status(200).json(info); 
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
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
            $set: req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


//DELETE

router.delete("/:id", async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted!"); 
    } catch (err) {
        res.status(500).json(err);
    }
} )







module.exports = router;