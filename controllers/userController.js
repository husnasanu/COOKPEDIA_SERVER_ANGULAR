const users = require('../models/userModel')
const bcript = require('bcrypt')
const jwt = require('jsonwebtoken')
// add user / register
exports.registerController = async (req,res)=>{
    console.log("inside registerController");
    const {username,email,password} = req.body
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Already Exist!!! Please Login....")

        }else{
            const encriptedPassword = await bcript.hash(password,10)
            const newuser = new users({
                username,email,password:encriptedPassword,profilePic:""
            })
            await newuser.save()
            res.status(200).json(newuser)
        }
    } catch (err) {
        res.status(401).json(err)
    }
    
}

exports.loginController = async(req,res)=>{
console.log("inside  loginController");
const{email,password} = req.body
try {
    const existingUser = await users.findOne({email})
    if(existingUser){
        let isMatch = await  bcript.compare(password,existingUser.password)
        if(existingUser.password == password || isMatch ){
           const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
           res.status(200).json({
            user:existingUser,token
           })
        }else{
            res.status(404).json("Invalid password")
        }
    }else{
        res.status(404).json("Invalid Email")
    }
} catch (err) {
    res.status(401).json(err)
}

}

