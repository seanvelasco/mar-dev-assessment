import type { NextApiRequest, NextApiResponse } from 'next'
import { Character } from "../../../schema"
import { ObjectId } from "mongodb"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, characterName, level, classType } = req.body

    const character = await Character.findOne({ owner: new ObjectId(id) })

    if (!character) {
        const newCharacter = new Character({
            owner: new ObjectId(id),
            characterName,
            level,
            classType
        })
    
        const savedCharacter = await newCharacter.save()

    
        return res.status(200).json(savedCharacter)
        
    }
    else {
        const status = await Character.updateMany({ owner: new ObjectId(id) }, {
            characterName,
            level,
            classType
        })
    
        return res.status(200).json(character)
    }

}