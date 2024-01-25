'use client'

import styles from './TrailerImage.module.scss'
import Image from 'next/image'

import Trailer from '../trailer/Trailer'
import { useState } from 'react'


export default function TrailerImage() {
    const [ showTrailer, setShowTrailer ] = useState<boolean>(false)

    const handleClick = () => {
        setShowTrailer((prev) => !prev)
    }

    return (
        <div className={ styles.trailerImage }>
            <Image src="/게임사진.jpeg" fill alt="game img" className={ styles.trailerImage__img }/>

            <div className={ styles.trailerImage__blur } onClick={ handleClick }>
                <p>트레일러 시청하기</p>
            </div>

            { showTrailer && 
                <div className={ styles.trailerImage__trailerArea } onClick={ handleClick }>
                    <Trailer videoId='GjWMRuYcdgc'/>
                </div>
            }
        </div>
    )
}