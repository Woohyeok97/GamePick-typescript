import Link from 'next/link'
import { connectDB } from '@/utils/database'
// components
import GameItem from '@/components/gameItem/GameItem'
// type
import { GameType } from '@/interface'



export default async function GamesPage() {
    const db = (await connectDB).db('game-pick')
    const data = await db.collection('games').find().toArray()

    return (
        <div className="page games-page">
            <div className="page__header">
                <h2>게임목록</h2>
            </div>

            <ul className="games-page__game-list">
            { data?.map((item, i) => 
                <li key={i}>
                    <Link href={`/games/${item?._id}`}>
                        <GameItem game={ item as GameType }/>
                    </Link>
                </li>
            ) }
            </ul>
        </div>
    )
}


// async function getGamesData() {
//     // const url = process?.env?.NEXT_PUBLIC_GAMES_API
//     // if(!url) return

//     try {
//         const response = await fetch(`api/games`)
//         return response
//     } catch(err) {
//         console.log(err)
//     }
// }