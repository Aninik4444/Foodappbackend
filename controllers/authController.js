const user = require("./../models/user");
const User = require("./../models/user");
const bcrypt = require("bcryptjs");
const JWT= require("jsonwebtoken")
//Register
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address,answer } = req.body
        //validation
        if (!userName || !email || !password || !phone || !address || !answer) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields'
            })
        }
        //check user
        const existing = await User.findOne({ email })
        if (existing) {
            return res.status(500).send({
                success: false,
                message: 'Email already registered please login'
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        //create new user
        const newUser = await User.create({
            userName,
            email,
            password:hashedPassword,
            address,
            phone,
            answer,
        });
        res.status(201).send({
            success: true,
            message: "Successfully Registered",
            data:newUser
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            message: 'error in Register API'
        })
    }
};
//Login
const loginController =async(req,res)=>{
try{
    const{email,password}=req.body;
    //validation
     if(!email|| !password){
      return res.status(500).send({
        success:false,
        message:"please provide email and password",
      });
    }
 //check user
 const newUser= await User.findOne({email})
 if(!newUser){
    return res.status(404).send({
        success:false,
        message:"User not found"
    });
 }
 //check user password | compare password
 const isMatch = await bcrypt.compare(password, newUser.password)
 if(isMatch){
    return res.status(500).send({
        success:false,
        message:'Invalid Credentials'
    });
 }
//  JWTtoken
const token =JWT.sign({id:newUser._id},process.env.JWT_SECRET,{
    expiresIn:"60d",
});
 newUser.password = undefined;
 res.status(200).send({
    success:true,
    message:"Login successfully",
    token,
    data:newUser
 });

}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in login API',
    })
}
};
module.exports = { registerController, loginController };