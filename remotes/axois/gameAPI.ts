import axios from "axios";
// type & schema
import { GameFormSchema, GameSchema } from "@/app/zod";
import { GameFormType, GameType } from "@/interface";

// 단일 게임 가져오기
export const fetchGameById = async (gameId: string): Promise<GameType> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_GAMES_API}/${gameId}`);
  const game = GameSchema.parse(response.data);

  return game;
};

// 게임 업로드
export const createGame = async (game: GameFormType) => {
  if (GameFormSchema.parse(game)) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_GAMES_API}`, game);
    return response;
  }
};

// 게임 수정
export const updateGameById = async (gameId: string, game: GameFormType) => {
  if (GameFormSchema.parse(game)) {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_GAMES_API}/${gameId}`, game);
    return response;
  }
};

// 게임 삭제
export const deleteGameById = async (gameId: string) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_GAMES_API}/${gameId}`);
  return response;
};