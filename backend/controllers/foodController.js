import foodModel from "../models/foodModel.js";
import fs from 'fs'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//add food item

const addFood = async (req, res) => {

  

    const uploadedFile = req.file || (Array.isArray(req.files) ? req.files[0] : undefined);

    if (!uploadedFile) {
        return res.status(400).json({
            success: false,
            message: "Image not received. Send as multipart/form-data with a file attached (key can be 'image')."
        });
    }

    const image_filename = uploadedFile.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "DB Error" });
    }
};

//Food list
const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({})
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

//Remove food Item
const removeFood=async(req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({success:false,message:"Food not found"})
        }

        const imagePath = path.resolve(__dirname, "..", "uploads", food.image);
        fs.unlink(imagePath,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Item Removed"})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})

    }

}


export {addFood, listFood,removeFood}