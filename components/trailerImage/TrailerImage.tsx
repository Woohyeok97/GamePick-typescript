'use client'
import styles from './TrailerImage.module.scss'
import Image from 'next/image'
// components
import FullOverlayWrap from '../overlayWraps/FullOverlayWrap'
import Trailer from '../trailer/Trailer'
// hooks
import useOverlay from '@/hooks/useOverlay'
//type
import { GameType } from '@/interface'


interface TrailerImageProps {
    game? : GameType,
}

export default function TrailerImage({ game } : TrailerImageProps) {
    const overlay = useOverlay()

    const handleTrailerOverlayOpen = () => {
        // 함수의 액션 & 액션의 중요내용 
        overlay.open((isOpen, close) => ( 
            <FullOverlayWrap isOpen={isOpen} close={close}> 
                <Trailer videoId='GjWMRuYcdgc'/>
            </FullOverlayWrap> 
        ))
    }


    return (
        <div className={ styles.trailerImage }>
            <Image src="/게임사진.jpeg" fill alt="game img" className={ styles.trailerImage__img }/>

            <div className={ styles.trailerImage__blur } onClick={ handleTrailerOverlayOpen }>
                <p>트레일러 시청하기</p>
            </div>
        </div>
    )
}