import { z } from 'zod';

// 게임 스키마
export const GameSchema = z.object({
    _id: z.string(),
    title: z.string().min(1),
    releasedAt: z.string(),
    trailerUrl: z.string(),
    image: z.string().url(),
    description: z.string().min(1),
});

// 게임 폼 타입
export const GameFormSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, '제목을 입력해주세요.'),
    releasedAt: z.string().min(1, '날짜를 입력해주세요..'),
    trailerUrl: z.string().min(1, '트레일러 url을 입력해주세요.'),
    image: z.union([
        z.string().url().min(1, '이미지를 선택해주세요.'),
        z.instanceof(File),
    ]),
    description: z.string().min(1, '설명을 입력해주세요.'),
});

// 유저라이크 스키마
export const LikeSchema = z.object({
    _id: z.string(),
    gameId: z.string(),
    userEmail: z.string().email(),
});