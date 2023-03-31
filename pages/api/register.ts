import bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from "../../dbSetup/index"
import { User } from "../../schema"

connect()

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== "POST") {
        return res.status(400).json({ message: "Invalid method" })
    }

    const { username, password, name } = req.body


    if (!username) {
        return res.status(400).json({ message: "Username not provided" })
    }

    if (!password) {
        return res.status(400).json({ message: "Password not provided" })
    }

    const exists = await User.findOne({ username })

    if (exists) {
        return res.status(400).json({ message: "User already exists" })
    }

    const user = new User({
        name,
        username,
        password: await bcrypt.hash(password, 10),
    })

    const results = await user.save()

    return res.status(200).json({ message: "User created" })

}