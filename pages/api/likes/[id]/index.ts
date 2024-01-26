import { connectDB } from "@/utils/database";
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
// type
import { GameType } from "@/interface";
import { ObjectId } from "mongodb";




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    const db = (await connectDB).db('game-pick')


    // DELETE
    if(req.method === 'DELETE') {
        if(!session) return res.status(401).json('로그인 정보를 확인해주세요.')

        try {
            const result = await db.collection('likes').deleteOne({ _id : new ObjectId(`${req.query.id}`) })
            return res.status(200).json(result)

        } catch(err) {
            return res.status(500).json(err)
        }
    }
}