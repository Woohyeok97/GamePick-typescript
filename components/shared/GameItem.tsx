import styles from './GameItem.module.scss'
import Image from 'next/image'
import { connectDB } from '@/utils/database'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
// component
import LikeButton from './LikeButton'
// type
import { GameType} from '@/interface'
import { LikeSchema } from '@/app/zod'



async function getUserLike(gameId: string, session: Session | null) {
    if (!session) return null;

    const db = (await connectDB).db('game-pick');
    const response = await db.collection('likes').findOne({ gameId: gameId, userEmail: session.user?.email });

    if (response) {
        const userLike = LikeSchema.parse({ ...response, _id: response?._id.toString() });
        return userLike;
    }

    return null;
}


interface GameItemProps {
    game: GameType,
}

export default async function GameItem({ game }: GameItemProps) {
    const session = await getServerSession(authOptions);
    const userLike = await getUserLike(game?._id, session);

    return (
        <div className={ styles.gameItem }>
            <Image src={ game?.image } width={300} height={250} alt='n' className={ styles.gameItem__img }/>
            
            <div className={ styles.gameItem__infoBox }>
                <div className={ styles.gameItem__header }>
                    <h1 className={ styles.gameItem__title }>
                        { game?.title } 
                    </h1>

                    <LikeButton userLike={ userLike } game={ game } session={ session } />
                </div>
                
                <div className={ styles.gameItem__description }>
                    { game?.description }
                </div>
                <div className={ styles.gameItem__releasedAt }>
                    { game?.releasedAt } 출시
                </div>
            </div>
        </div>
    );
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