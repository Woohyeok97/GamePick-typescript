import { z } from "zod";
// schema
import { GameSchema, LikeSchema } from "@/app/zod";


// 게임 타입
export type GameType = z.infer<typeof GameSchema>;

// 관심 타입
export type LikeType = z.infer<typeof LikeSchema> | null;

// overlay 반환 함수 타입
export type OverlayContentType = (isOpen: boolean, close: () => void) => JSX.Element;


// import { ObjectId } from "mongodb";

// // game
// export interface GameType {
//     _id?: ObjectId,
//     title : string,
//     releasedAt : string,
//     trailerUrl : string,
//     image : string,
//     description : string,
// }

// // like
// export interface LikeType {
//     _id : string,
//     gameId : string,
//     userEmail : string,
// }

// // overlay 반환 함수 타입
// export type OverlayContentType = (isOpen: boolean, close: () => void) => JSX.Element;