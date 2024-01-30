import { ObjectId } from "mongodb";

export interface GameType {
    _id?: ObjectId,
    title : string,
    releasedAt : string,
    trailerUrl : string,
    image? : string,
    description : string,
}

export type OverlayContentType = (isOpen: boolean, close: () => void) => JSX.Element;