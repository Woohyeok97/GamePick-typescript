import Image from 'next/image'
import styles from './GameItem.module.scss'
// type
import { GameType } from '@/interface'


interface GameItemProps {
    game : GameType,
}
export default function GameItem({ game } : GameItemProps) {

    return (
        <div className={ styles.gameItem }>
            <Image src="/게임사진.jpeg" width={300} height={250} alt='n' className={ styles.gameItem__img }/>
            <div className={ styles.gameItem__infoBox }>
                <h1 className={ styles.infoBox__title }>
                    { game?.title }
                </h1>
                <div className={ styles.infoBox__description }>
                    { game?.description }
                </div>
                <div className={ styles.infoBox__releasedAt }>
                    { game?.releasedAt } 출시
                </div>
            </div>
        </div>
    )
}