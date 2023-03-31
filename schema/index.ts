import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    }
})

const characterSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    characterName: {
        type: String,
        required: false,
        unique: false,
    },
    level: {
        type: String,
        required: false,
        unique: false,
    },
    classType: {
        type: String,
        required: false,
        unique: false,
    }
})

const User = mongoose.models.user || mongoose.model("user", userSchema)

const Character = mongoose.models.character || mongoose.model("character", characterSchema)

export {
    User,
    Character
}