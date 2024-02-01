'use client'
import styles from './GameUploadPreview.module.scss'
import { ReactNode } from "react"


interface GameUploadPreviewProps {
    children : ReactNode,
     onSubmit : () => void
}

export default function GameUploadPreview({ children, onSubmit } : GameUploadPreviewProps ) {

    return (
        <div className={ styles.gameUploadPreview }>
            <div className={ styles.gameUploadPreview__preview }>
                { children }
            </div>

            <div className={ styles.gameUploadPreview__inner }>
                <div className={ styles.gameUploadPreview__noti }>
                    <div>이 게임은 이렇게 보일 거예요.</div>
                    <p>업로드 할까요?</p>
                </div>
                <div className={ styles.gameUploadPreview__btnArea }>
                    <button className='btn' onClick={ onSubmit }>업로드</button>
                </div>
            </div>
        </div>
    )
}
