import type { NextApiRequest, NextApiResponse } from 'next'
import { Character } from "../../../schema"
import { ObjectId } from "mongodb"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body
    const character = await Character.findOne({ owner: new ObjectId(id) })
    if (!character) {
        return res.status(400).json({})
    }
    return res.status(200).json(character)
}