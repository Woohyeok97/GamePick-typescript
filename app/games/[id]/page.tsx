import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
// components
import TrailerImage from "@/components/trailerImage/TrailerImage";
import LikeButton from "@/components/shared/LikeButton";
// type
import { GameType } from "@/interface";


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
                    <div>
                        { params?.id === game?._id.toString() &&
                            <LikeButton gameId={ game?._id.toString() }/>
                        }  
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

