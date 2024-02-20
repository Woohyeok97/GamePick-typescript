import axios from "axios";
// type & schema
import { GameSchema } from "@/app/zod";
import { GameType } from "@/interface";

// 단일 게임 가져오기
export const fetchGameById = async (gameId: string): Promise<GameType> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_GAMES_API}/${gameId}`);
  const game = GameSchema.parse(response.data);

  return game;
};