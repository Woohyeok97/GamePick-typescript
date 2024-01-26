import { connectDB } from "@/utils/database";
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
// type
import { GameType } from "@/interface";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    const db = (await connectDB).db('game-pick')

    // GET
    if(req.method === 'GET') {
        if(!session) return res.status(401).json('로그인 정보를 확인해주세요.')

        try {
            const result = await db.collection('likes').findOne({ userEmail : session?.user?.email, gameId : req.query.gameId })
            return res.status(200).json(result)

        } catch(err) {
            return res.status(500).json(err)
        }
    }

    // POST
    if(req.method === 'POST') {
        if(!session) return res.status(401).json('로그인 정보를 확인해주세요.')

        try {
            console.log(req.body)
            const insertData = { gameId : req.body.gameId, userEmail : session?.user?.email }
            const result = await db.collection('likes').insertOne({ ...insertData })

            return res.status(200).json(result)

        } catch(err) {
            return res.status(500).json(err)
        }
    }
}