import mongoose from "mongoose"

export default async () => {
    return await mongoose.connect("mongodb://localhost:27017/pru-life")
}