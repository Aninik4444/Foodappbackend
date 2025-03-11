const categoryModel = require("../models/categoryModel");

//CREATE CATEGORY
const createCatController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body
        //validation
        if (!title || !imageUrl) {
            return res.status(500).send({
                success: false,
                message: "please provide category title or image",
            })
        }
        const newCategory = new categoryModel({ title, imageUrl })
        const category = await newCategory.save()
        res.status(201).send({
            success: true,
            message: "category created",
            newCategory,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create API",
        })
    }
};

module.exports = { createCatController };