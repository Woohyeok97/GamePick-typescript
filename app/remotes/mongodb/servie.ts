import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
// type & schema
import { GameSchema, LikeSchema } from "@/app/zod";
import { Session } from "next-auth";


// 게임리스트 가져오기
export async function getGameList() {
  const db = (await connectDB).db('game-pick')
  const response = await db.collection('games').find().toArray();
  const gameList = response.map(item => ({ ...item, _id: item?._id.toString() })).map(item => GameSchema.parse(item));

  return gameList;
}

// 단일 게임 가져오기
export async function getGameById(gameId: string) {
  const db = (await connectDB).db('game-pick');
  const response = await db.collection('games').findOne({ _id: new ObjectId(gameId) });
  const game = GameSchema.parse({ ...response, _id: response?._id.toString() });
  
  return game;
};

// 유저 좋아요 가져오기
export async function getUserLike(gameId: string, session: Session | null) {
  if (!session) return null;
  
  const db = (await connectDB).db('game-pick');
  const response = await db.collection('likes').findOne({ gameId: gameId, userEmail: session.user?.email });
  
  if (response) {
    const userLike = LikeSchema.parse({ ...response, _id: response?._id.toString() });
    return userLike;
  }

  return null;
};