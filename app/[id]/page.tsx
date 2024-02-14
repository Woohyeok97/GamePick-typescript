import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// components
import TrailerImage from "@/components/trailerImage/TrailerImage";
import LikeButton from "@/components/shared/LikeButton";
// type
import { GameType, LikeType } from "@/interface";
import { GameSchema, LikeSchema } from "../zod";


async function getGame(gameId: string) {
  const db = (await connectDB).db('game-pick');
  const response = await db.collection('games').findOne({ _id: new ObjectId(gameId) });
  const game = GameSchema.parse({ ...response, _id: response?._id.toString() });
  
  return game;
};

async function getUserLike(gameId: string, session: Session | null) {
  if (!session) return null;
  
  const db = (await connectDB).db('game-pick');
  const response = await db.collection('likes').findOne({ gameId: gameId, userEmail: session.user?.email });
  
  if (response) {
    const userLike = LikeSchema.parse({ ...response, _id: response?._id.toString() });
    return userLike;
  }

  return null;
};

interface GameDetailPageProps {
  params: { id: string }
}

export default async function GamePage({ params } : GameDetailPageProps) {
  const session = await getServerSession(authOptions)
  const game = await getGame(params?.id);
  const userLike = await getUserLike(game?._id, session);

  return (
    <div className="page detail-page">
      <div className="page__header">
        <div className="detail-page__header-box">
          <h2>{ game?.title }</h2>
          <div>
            <LikeButton userLike={ userLike } game={ game } session={ session } />
          </div>
        </div>
      </div>
      <div className="detail-page__detail">
          <div className="detail__img-box">
              <TrailerImage game={ game as GameType}/>
          </div>

          <div className="detail__info-box">
              <div className="detail__info description">
                  <div className="header">소개</div>
                  <div className="text">
                      { game?.description }
                  </div>
              </div>
              <div className="detail__info releasedAt">
                  <div className="header">출시일</div>
                  <div className="text">
                      { game?.releasedAt }
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
