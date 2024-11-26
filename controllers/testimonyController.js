const testimonials = require('../models/testimony')

// add testimonials
exports.addTestimonyController = async (req,res)=>{
    console.log("inside AddTstimonyController");
    const  {name,email,message} = req.body
    try{
        const newMessage = new testimonials({
            name,email,message
        })
        await newMessage.save()
        res.status(200).json(newMessage)
    }catch(err){
        res.status(401).json(err)
    }
    
}