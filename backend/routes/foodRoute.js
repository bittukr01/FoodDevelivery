import express from "express";
import { addFood,listFood ,removeFood} from "../controllers/foodController.js";
import multer from "multer";
import path from "path";

const foodRouter=express.Router();

//Image Store
const storage=multer.diskStorage({
    destination: path.join(process.cwd(), "uploads"),
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})

// Accept the first uploaded file even if the client uses a different field name.
foodRouter.post("/add",upload.any(),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)




export default foodRouter;