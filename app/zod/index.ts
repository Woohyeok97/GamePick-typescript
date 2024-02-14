import { z } from "zod";

// 게임 스키마
export const GameSchema = z.object({
    _id: z.string(),
    title: z.string().min(1),
    releasedAt: z.string(),
    trailerUrl: z.string(),
    image: z.string().url(),
    description: z.string().min(1),
});

// 관심게임 스키마
export const LikeSchema = z.object({
    _id: z.string(),
    gameId: z.string(),
    userEmail: z.string().email(),
});