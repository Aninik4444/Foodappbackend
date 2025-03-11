const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController, getAllFoodController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");



const router = express.Router()

//routes
//CREATE FOOD
router.post("/create", authMiddleware,createFoodController);
//GET ALL FOOD
router.get("/getAll",getAllFoodController);
//GET SINGLE FOOD
router.get("/get/:id",getSingleFoodController);
//get food by resturant
router.get("/getByResturant/:id",getFoodByResturantController);
//update food
router.put("/update/:id",authMiddleware,updateFoodController);
//delete food
router.delete("/delete/:id",authMiddleware,deleteFoodController);
//PLACE ORDER
router.post("/placeorder",authMiddleware,placeOrderController);
//ORDER STATUS
router.post("/orderStatus/:id", adminMiddleware,authMiddleware,orderStatusController);

module.exports = router;