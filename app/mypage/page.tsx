import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { connectDB } from "@/utils/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import Link from 'next/link'
// components
import GameItem from "@/components/shared/GameItem"
// type
import { GameType } from "@/interface"
import LikeButton from "@/components/shared/LikeButton"


async function getMyGames(userEmail : any) {
    const db = (await connectDB).db('game-pick')
    const likes = await db.collection('likes').find({ userEmail :  userEmail }).toArray()
    const likeGameIds = likes.map(doc => new ObjectId(doc.gameId));
    const myGames = await db.collection('games').find({ _id: { $in: likeGameIds } }).toArray();

    return myGames as GameType[]
}

export default async function MyPage() {
    const session = await getServerSession(authOptions)
    const myGames = await getMyGames(session?.user?.email)

    return (
        <div className="page">
            <div className="page__header">
                <h2>좋아요 게임 관리</h2>
            </div>

            <ul className="">
            { myGames?.map((item, i) => 
                <li key={`${item?._id}`}>
                    <Link href={`/games/${item?._id}`}>
                    <>
                        <GameItem game={item}/>
                        <div className="like__inner">
                            <LikeButton gameId={`${item?._id}`}/>
                        </div>
                    </>
                    </Link>
                </li>
            ) }
            </ul>
        </div>
    )
}