import { useAppDispatch } from "@/redux/hooks";
import { closeOverlay, openOverlay} from "@/redux/features/overlaySlice"
import { useEffect } from "react";
// type
import { OverlayContentType } from "@/interface";


export default function useOverlay() {
    const dispatch = useAppDispatch();

    // 오버레이 JSX를 설정, isOpen을 true로 하는 함수
    const open = (content: OverlayContentType) => {
        dispatch(openOverlay(content));
    };

    // 오버레이 close
    const close = () => {
        dispatch(closeOverlay());
    }

    // useOverlay 사용하는 컴포넌트 언마운트시, close() 실행
    useEffect(() => {
        return () => close()
    }, []);

    return  { open }
}


