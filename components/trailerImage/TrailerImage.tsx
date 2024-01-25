'use client'

import styles from './TrailerImage.module.scss'
import Image from 'next/image'


export default function TrailerImage() {

    return (
        <div className={ styles.trailerImage }>
            <Image src="/게임사진.jpeg" width={600} height={300} alt="game img" className={ styles.trailerImage__img }/>
        </div>
    )
}