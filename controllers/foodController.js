const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");
const resturantModel = require("../models/resturantModel");
const mongoose = require('mongoose');
//CREATE fOOD
const createFoodController = async (req, res) => {
    try {
        const { title, description, price, imageUrl, foodTags, category, code, isAvailable, resturant, rating } = req.body
        //validation
        if (!title || !description || !price || !resturant) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields",
            })
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating
        });
        await newFood.save()
        res.status(201).send({
            success: true,
            message: "New food item created",
            newFood
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create food API",
            error
        })
    }
};
//GET ALL FOODS
const getAllFoodController = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: "No food item is found",
            })
        }
        res.status(200).send({
            success: true,
            totalFoofs: foods.length,
            foods,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "ERROR IN GETALL API",
            error
        })
    }
};
//get single food
const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "please provide id",
            })
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found with this id",
            })
        }
        res.status(200).send({
            success: true,
            food,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "ERROR IN SINGLE FOOD API",
            error
        });
    }
};
// get food by resturant
const getFoodByResturantController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!rusturantId) {
            return res.status(404).send({
                success: false,
                message: "please provide id",
            })
        }
        const food = await resturantModel.find({ resturant: resturantId });
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found with this id",
            })
        }
        res.status(200).send({
            success: true,
            message: "food based on resturant",
            food,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "ERROR IN RESTURANT FOOD API",
            error
        });
    }
};
//update food item
const updateFoodController = async (req, res) => {
    try {
        const foodID = req.params.id;
        if (!foodID) {
            return res.status(404).send({
                success: false,
                message: "no food item is found",
            })
        }
        const food = await foodModel.findById(foodID)
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "no food found",
            })
        }
        const { title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating,
        } = req.body
        const updatedFood = await foodModel.findByIdAndUpdate(foodID, {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating,
        }, { new: true })
        res.status(200).send({
            success: false,
            message: "Food item was updated",
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "ERROR IN FOOD API",
            error
        });
    }
};
const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "provide food id",
            })
        }
        const food = await foodModel.findById(foodId)
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "no food found",
            })
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: "food item deleted",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "ERROR IN FOOD API",
            error
        });
    }
};
//PLACE ORDER
const placeOrderController = async (req, res) => {
    try {
        const { cart } = req.body
        if (!cart) {
            return res.status(500).send({
                success: false,
                message: "food cart or payment method",
            })
        }
        let total = 0
        //cal
        cart.map((i) => {
            total += i.price
        })
        const foodIds = cart.map((i) => {
            return new mongoose.Types.ObjectId(i.id)
        })
        console.log({ cart })
        const newOrder = new orderModel({
            foods: foodIds,
            payment: total,
            buyer: new mongoose.Types.ObjectId(req.body.id)
        })
        const placeorder = await newOrder.save()
        console.log({ placeorder })
        res.status(201).send({
            success: true,
            message: "Order placed successfully",
            newOrder,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "ERROR IN PLACE ORDER API",
            error
        });
    }
};
//CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(404).send({
                success: false,
                message: "please provide valid order id"
            })
        }
        const { status } = req.body
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Order Status Updated",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "ERROR IN ORDER STATUS",
            error
        });
    }
};
module.exports = { createFoodController, getAllFoodController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController }