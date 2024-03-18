import { ReactNode, useEffect, useState } from "react";

interface FullOverlayWrapProps {
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}

export default function FullOverlayWrap({ children, isOpen, close }: FullOverlayWrapProps) {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  // 시간차로 close 함수 실행하기(useEffect에서 타이머 메모리누수 관리)
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isOpen && isAnimating) {
      timer = setTimeout(() => {
        close();
      }, 300);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAnimating]);


  return (
    <div className={`${isAnimating ? 'animate-slideDown' : 'animate-slideUp'} fixed bottom-0 left-0 w-full h-[100vh] z-40 flex items-end`}>
      <div className="w-[90%] h-[90%] m-auto mb-0 max-w-[1140px] max-h-[860px] py-5 box-border border rounded-md hadow-[2px_4px_6px_rgba(0,0,0,0.1)] bg-fontGray">
        <div className="relative w-[90%] h-full m-auto">
          <div 
            className="absolute top-0 right-0 z-50 p-3 text-xl text-center cursor-pointer min-w-5 min-h-5 text-fontDarkGray"
            onClick={() => setIsAnimating(true)}
          >
            X
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}