import { ObjectId } from "mongodb";

// game
export interface GameType {
    _id?: ObjectId,
    title : string,
    releasedAt : string,
    trailerUrl : string,
    image : string,
    description : string,
}

// like
export interface LikeType {
    _id : string,
    gameId : string,
    userEmail : string,
}

// overlay 반환 함수 타입
export type OverlayContentType = (isOpen: boolean, close: () => void) => JSX.Element;