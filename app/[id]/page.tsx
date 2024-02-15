import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// components
import TrailerImage from "@/components/trailerImage/TrailerImage";
import LikeButton from "@/components/shared/LikeButton";
// remotes
import { getGameById, getUserLike } from "../remotes/mongodb/servie";



interface GameDetailPageProps {
  params: { id: string }
}

export default async function GamePage({ params } : GameDetailPageProps) {
  const session = await getServerSession(authOptions)
  const game = await getGameById(params?.id);
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
          <TrailerImage game={ game } />
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
