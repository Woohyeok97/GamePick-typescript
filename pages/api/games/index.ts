import { connectDB } from "@/utils/database";
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
// type
import { GameType } from "@/interface";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    const db = (await connectDB).db('game-pick')

    console.log(session?.user)

    // GET
    if(req.method === 'GET') {
        try {
            const result = await db.collection('games').find().toArray() as GameType[]
            return res.status(200).json(result)
        } catch(err) {
            return res.status(500).json(err)
        }
    }

    // POST
    if(req.method === 'POST') {
        if(!session) return res.status(400).json('로그인 이후 이용해주세요.')

        try {
            const formData : GameType = req.body
            const result = await db.collection('games').insertOne(formData)
            
            console.log(formData)

            return res.status(200).json(result)

        } catch(err) {
            return res.status(500).json(err)
        }
    }
}