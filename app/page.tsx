import Link from 'next/link'
import { connectDB } from '@/utils/database'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
// components
import GameItem from '@/components/shared/GameItem'
import UserProfile from '@/components/shared/UserProfile'
import GuestProfile from '@/components/shared/GuestProfile'
// type
import { GameType } from '@/interface'


async function getGameList() {
    const db = (await connectDB).db('game-pick')
    const response = await db.collection('games').find().toArray()
    console.log('게임리스트 요청 실행됨')
    return response
}

export default async function HomePage() {
    const session = await getServerSession(authOptions)
    const gameList = await getGameList()
    
    return (
        <div className="page games-page">
            <div className=''>
                { session?.user ? (
                    <UserProfile session={ session }/>
                ) : (
                    <GuestProfile/>
                ) }
            </div>

            <div className="page__header">
                <h2>게임목록</h2>
            </div>

            <ul className="games-page__game-list">
            { gameList?.map((item, _) => (
                <li key={`${item?._id}`}>
                    <Link href={`/${item?._id}`}>
                        <GameItem game={ item as GameType }/>
                    </Link>
                </li> )
            ) }
            </ul>
        </div>
    )
}
