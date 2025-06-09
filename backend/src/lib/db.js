import mongoose from "mongoose"

export async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected");
    }
    catch(err) {
        console.log(`Error: ${err}`);
    }
}