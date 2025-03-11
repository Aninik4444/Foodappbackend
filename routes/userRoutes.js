const express = require("express");
const { getUserController, updateUserController, resetPasswordControlled, updatePasswordController, deleteProfileController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { updateSearchIndex } = require("../models/user");


const router = express.Router()

//routes
// GET user ||GET
router.get("/getUser" ,authMiddleware,getUserController);

//UPDATE profile
router.put("/updateUser",authMiddleware,updateUserController);
//password update
router.post("/updatePassword", authMiddleware, updatePasswordController);

//RESET password
router.post("/resetPassword",authMiddleware,resetPasswordControlled);

//DELETE USER
router.delete("/deleteUser/:id",authMiddleware,deleteProfileController);

module.exports = router;