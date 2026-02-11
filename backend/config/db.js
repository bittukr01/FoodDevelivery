import mongoose from "mongoose";

export const connectDB=async()=>{
    const mongoUri = process.env.MONGO_URI ||
        "mongodb+srv://bitturao912_db_user:bittuthetaste@cluster0.fxy0gzl.mongodb.net/TheTaste";

    try {
        await mongoose.connect(mongoUri);
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error?.message || error);
        throw error;
    }
}