'use client'
import styles from './GameUploadPreview.module.scss'
import { ReactNode, useEffect } from "react"


interface GameUploadPreviewProps {
    children : ReactNode,
    onSubmit : () => void,
    objectURL : string,
}

export default function GameUploadPreview({ children, onSubmit, objectURL } : GameUploadPreviewProps ) {
    
    
    useEffect(() => {

        // 언마운트시, object url 제거 (메모리 누수)
        return () => {
            // objectURL인 경우에만 실행
            if(objectURL.startsWith('blob:')) URL.revokeObjectURL(objectURL)
        }
    }, [objectURL])

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
