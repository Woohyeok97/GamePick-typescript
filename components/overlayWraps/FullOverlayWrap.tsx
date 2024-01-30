import styles from './overlayWraps.module.scss'
import { ReactNode, useEffect, useState } from "react";

interface FullOverlayWrapProps {
    children : ReactNode,
    isOpen : boolean,
    close : () => void,
}

export default function FullOverlayWrap({ children, isOpen, close } : FullOverlayWrapProps) {
    const [ isAnimating, setIsAnimating ] = useState<boolean>(false)
    // 해당 오버레이 클래스명(애니메이션)
    const overlayClass = `${styles.fullOverlayWrap} ${isAnimating ? styles.close : styles.open}`

    // 시간차로 close 함수 실행하기(useEffect에서 타이머 메모리누수 관리)
    useEffect(() => {
        let timer : NodeJS.Timeout | undefined;

        if(isOpen && isAnimating) {
            timer = setTimeout(() => {
                close()
            }, 300)
        }

        return () => {
            if(timer) clearTimeout(timer) // timer가 있을때만 호출
        }

    }, [isAnimating])


    const handleClose = () => {
        setIsAnimating(true)
    }

    

    return (
        <div className={ overlayClass }>
            <div className={ styles.fullOverlayWrap__inner }>
                <div className={ styles.fullOverlayWrap__content }>
                    <div className={ styles.fullOverlayWrap__closeArea } onClick={ handleClose }>X</div>
                    { children }
                </div>
            </div>
        </div>
    )
}