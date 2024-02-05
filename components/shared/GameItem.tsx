'use client'

import Image from 'next/image'
import styles from './GameItem.module.scss'
// type
import { GameType } from '@/interface'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


interface GameItemProps {
    game : GameType,
}

export default function GameItem({ game } : GameItemProps) {
    const session = useSession()

    const getUserLike = async () => {

        // const delayMs = 3000;
        // await new Promise(resolve => setTimeout(resolve, delayMs));

        // 지연 후 API 요청을 수행합니다.
        const response = await axios.get(`${process.env.NEXT_PUBLIC_LIKES_API}/?gameId=${game?._id}`);
        return response.data;
    }

    const { data : like, isFetched } = useQuery({
        queryKey : [`isLike`, `${game?._id}`],
        queryFn : getUserLike,
        enabled : !!session.data,
        staleTime : Infinity,
        refetchOnWindowFocus : false,
    })

    const likeClass = `${ styles.gameItem__like } ${like ? styles.likeActive : styles.likeInactive}`
    
    return (
        <div className={ styles.gameItem }>
            <Image src={ game?.image } width={300} height={250} alt='n' className={ styles.gameItem__img }/>
            
            <div className={ styles.gameItem__infoBox }>
                <div className={ styles.gameItem__header }>
                    <h1 className={ styles.gameItem__title }>
                        { game?.title } 
                    </h1>
                    <div className={ likeClass }>
                    { isFetched ? '하트' : <h3>Loading..</h3> }
                    </div>
                </div>
                
                <div className={ styles.gameItem__description }>
                    { game?.description }
                </div>
                <div className={ styles.gameItem__releasedAt }>
                    { game?.releasedAt } 출시
                </div>
            </div>
        </div>
    )
}

// import Image from 'next/image'
// import styles from './GameItem.module.scss'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/pages/api/auth/[...nextauth]'
// // type
// import { GameType } from '@/interface'
// import { connectDB } from '@/utils/database'



// export async function getUserLike(userEmail : any, gameId : string) {
//     if(!userEmail) return null

//     const db = (await connectDB).db('game-pick')
//     const userLike = await db.collection('likes').findOne({ userEmail : userEmail, gameId : gameId })
//     console.log(`게임아이템 좋아요페치 실행됨`, gameId)
//     return userLike
// }

// interface GameItemProps {
//     game : GameType,
// }

// export default async function GameItem({ game } : GameItemProps) {
//     const session = await getServerSession(authOptions)
//     const userLike = await getUserLike(session?.user?.email, `${game?._id}`)
//     const likeClass = `${ styles.gameItem__like } ${userLike ? styles.likeActive : styles.likeInactive}`

    
//     return (
//         <div className={ styles.gameItem }>
//             <Image src={ game?.image } width={300} height={250} alt='n' className={ styles.gameItem__img }/>
            
//             <div className={ styles.gameItem__infoBox }>
//                 <div className={ styles.gameItem__header }>
//                     <h1 className={ styles.gameItem__title }>
//                         { game?.title } 
//                     </h1>
//                     <div className={ likeClass }>
//                         하트
//                     </div>
//                 </div>
                
//                 <div className={ styles.gameItem__description }>
//                     { game?.description }
//                 </div>
//                 <div className={ styles.gameItem__releasedAt }>
//                     { game?.releasedAt } 출시
//                 </div>
//             </div>
//         </div>
//     )
// }