import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import userRouter from "./routes/UserRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"





//app config

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app=express()
const port=4000

//middleware
app.use(express.json())
app.use(cors())

//DB Connectioin
connectDB();


//API Endpoints

app.use("/api/food",foodRouter)

// Serve uploaded images
app.use("/images", express.static(path.join(__dirname, "uploads")))

app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})