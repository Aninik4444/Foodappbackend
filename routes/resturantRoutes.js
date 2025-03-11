const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createResturantController, getResturantController, getAllResturantController, getResturantByIdController, deleteResturantController } = require("../controllers/resturantController");



const router = express.Router()

//routes
//CREATE RESTURANT ||POST
router.post('/create', authMiddleware, createResturantController);
//GET ALL RESTURANTD || GET
router.get("/getAll" , authMiddleware,getAllResturantController);
//GET RESTURANT BY ID ||GET
router.get ("/get/:id", authMiddleware,getResturantByIdController);
//Delete Resturant || Delete
router.delete("/delete/:id", authMiddleware, deleteResturantController);
module.exports = router;