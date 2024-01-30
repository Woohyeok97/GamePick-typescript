'use client'
import { closeOverlay } from "@/redux/features/overlaySlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"


export default function Overlay () {
    const { isOpen, overlayContent } = useAppSelector(state => state.overlayState)
    const dispatch = useAppDispatch()

    // 오버레이를 닫는 함수
    const close = () => {
        dispatch(closeOverlay())
    };

    return (
        <>
        { isOpen && overlayContent && 
            <div>{ overlayContent(isOpen, close) }</div> }
        </>
        
    )
}

// { isOpen && overlayContent &&  overlayContent(isOpen, close) }