import mongoose from "mongoose"

export default async () => {
    return await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pru-life")
}