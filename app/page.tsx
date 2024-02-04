import Link from 'next/link'
import { connectDB } from '@/utils/database'
import { getServerSession } from 'next-auth'
// components
import GameItem from '@/components/shared/GameItem'
import UserProfile from '@/components/shared/UserProfile'
import GuestProfile from '@/components/shared/GuestProfile'
// type
import { GameType } from '@/interface'



export default async function HomePage() {
    const db = (await connectDB).db('game-pick')
    const data = await db.collection('games').find().toArray()
    const session = await getServerSession()

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
            { data?.map((item, i) => 
                <li key={`${item?._id}`}>
                    <Link href={`/games/${item?._id}`}>
                        <GameItem game={ item as GameType }/>
                    </Link>
                </li>
            ) }
            </ul>
        </div>
    )
}
