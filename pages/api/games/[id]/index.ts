import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const db = (await connectDB).db('game-pick');

  // GET
  if (req.method === 'GET') {
    try {
      if (typeof(req.query.id) === 'string') {
        const result = await db.collection('games').findOne({ _id : new ObjectId(req.query.id) });
        return res.status(200).json(result);
      }  
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // PUT
  if (req.method === 'PUT') {
    if (!session) return res.status(401).json('로그인 상태를 확인해주세요.');

    try {
      const { _id, ...updateData } = req.body;
      const result = await db.collection('games').updateOne({ _id : new ObjectId(`${req.query.id}`) }, { $set : updateData });
      return res.status(200).json(result);
        
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  // DELETE
  if(req.method === 'DELETE') {
    if (!session) return res.status(401).json('로그인 상태를 확인해주세요.');

    try {
      // 해당 게임 관심등록 먼저 삭제 
      await db.collection('likes').deleteMany({ gameId: req.query.id });
      // 성공시, 게임 삭제
      const result = await db.collection('games').deleteOne({ _id : new ObjectId(`${req.query.id}`) });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}