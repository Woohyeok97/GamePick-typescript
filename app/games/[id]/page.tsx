import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
// components
import TrailerImage from "@/components/trailerImage/TrailerImage";

interface GameDetailPageProps {
    params : { id : string }
}

export default async function GameDetailPage({ params } : GameDetailPageProps) {
    const db = (await connectDB).db('game-pick')
    const game = await db.collection('games').findOne({ _id : new ObjectId(params?.id) })
    
    return (
        <div className="page detail-page">
            <div className="page__header">
                <div className="detail-page__header-box">
                    <h2>{ game?.title }</h2>
                    <button>하트</button>
                </div>
            </div>

            <div className="detail-page__detail">
                <div className="detail__img-box">
                    <TrailerImage/>
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