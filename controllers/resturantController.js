const resturantModel = require("../models/resturantModel");

//Create Resturant
const createResturantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body
        //validation
        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: "please provide title and address",
            });
        }
        const newResturant = new resturantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        })
        await newResturant.save()

        res.status(201).send({
            success: true,
            message: "New resturant created successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create resturant API",
            error
        })
    }
}
const getAllResturantController = async (req, res) => {
    try {
        const resturants = await resturantModel.find({})
        if (!resturants) {
            return res.status(404).send({
                success: false,
                message: "No Resturant Available"
            })
        }
        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            resturants
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get all resturant API",
            error
        })
    }
}
const getResturantByIdController = async (req, res) => {
    try {
        const resturantId = req.params.id
        //validate
        if (!resturantId)
            return res.status(404).send({
                success: false,
                message: "Please provide resturant Id",
            });
        // find resturant
        const resturant = await resturantModel.findById(resturantId)
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "No resturant found",
            })
        }
        res.status(200).send({
            success: true,
            resturant,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get resturant by id API",
            error
        })
    }
}
//DELETE RESTURANT 
const deleteResturantController =async(req,res)=>{
try{
   const resturantId = req.params.id
   if(!resturantId){
    return res.status(404).send({
        success:false,
        message:"Please provide resturant ID"
    })
   }
   await resturantModel.findByIdAndDelete(resturantId)
   res.status(200).send({
    success:true,
    message:"Resturant Deleted Successfully",
   });
   if(!resturantId){
    return res.status(404).send({
        success:false,
        message:"No resturant found"
    })
   }
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in delete resturant API",
    });
}
};
module.exports = {
     createResturantController, 
    getAllResturantController, 
    getResturantByIdController,
    deleteResturantController,
};