const User = require("../models/user");
const bcrypt = require("bcryptjs");

//GET user info
const getUserController = async (req, res) => {
    try {
        //find user
        const newUser = await User.findById(req.body.id);

        //validation
        if (!newUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        //hide password
        newUser.password = undefined
        //response
        res.status(200).send({
            success: true,
            message: "User get successfully",
            newUser,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get API",
        })
    }
};
//UPDATE USER   
const updateUserController = async (req, res) => {
    try {
        //find User
        const newUser = await User.findById(req.body.id)
        console.log({ newUser })
        //validation
        if (!newUser) {
            return res.status(404).send({
                success: false,
                message: "user not found"
            })
        }
        //update
        const { userName, address, phone } = req.body
        if (userName) newUser.userName = userName
        if (address) newUser.address = address
        if (phone) newUser.phone = phone
        //saveuser
        const updatedUser = await newUser.save();
        res.status(200).send({
            success: true,
            message: "user updated successfully",
            data: updatedUser
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            messge: "Error in update user api",
            error
        })
    }
};
//UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
    try {
        //find user
        const newUser = await User.findById(req.body.id)
        //validation
        if (!newUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        //get data from user
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please provide old or new password"
            })
        }
        //check user password | compare password
        const isMatch = await bcrypt.compare(oldPassword, newUser.password)
        if (isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid old password'
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        newUser.password = hashedPassword;
        const updatePassword = await newUser.save();
        res.status(200).send({
            success: true,
            message: "Password updated"
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in password update API"
        })
    }
}

//RESET USER PASSWORD
const resetPasswordControlled = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }
        const newUser = await User.findOne({ email, answer })
        if (!newUser) {
            return res.status(500).send({
                success: false,
                message: "User not found"
            })
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        newUser.password = hashedPassword
        const resetPassword = await newUser.save()
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",

        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in password Reset API",
            error,
        });

    }
}
//DELETE PROFILE ACCOUNT
const deleteProfileController =async(req,res)=>{
 try{
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({
        message:"Your account has been deleted",
    });
 }catch(error){
    console.log(error)
        res.status(500).send({
        success:false,
        message:"Error in delete Profile API"
    })
 }
}

module.exports = {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordControlled,
    deleteProfileController

};