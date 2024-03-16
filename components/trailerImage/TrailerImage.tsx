'use client'
import Image from 'next/image';
// components
import FullOverlayWrap from '../overlayWraps/FullOverlayWrap';
import Trailer from '../trailer/Trailer';
// hooks
import useOverlay from '@/hooks/useOverlay';
//type
import { GameType } from '@/interface';


interface TrailerImageProps {
  game: GameType;
}

export default function TrailerImage({ game }: TrailerImageProps) {
  const overlay = useOverlay();

  const handleTrailerOverlayOpen = () => {
    // 함수의 액션 & 액션의 중요내용 
    overlay.open((isOpen, close) => ( 
      <FullOverlayWrap isOpen={isOpen} close={close}> 
        <Trailer videoId={game?.trailerUrl} />
      </FullOverlayWrap> 
    ));
  };

  return (
    <div className="relative rounded-md overflow-hidden w-full h-[420px] cursor-pointer md:w-[640px]">
      <Image src={game?.image} fill alt="img" className="object-cover w-full h-full" />

      <div 
        className="opacity-0 absolute top-0 left-0 w-full h-full bg-black flex justify-end items-end py-[2.5%] px-[4%] box-border hover:opacity-30"
        onClick={handleTrailerOverlayOpen}
      >
        <p className="text-xl text-fontWhite">트레일러 시청하기</p>
      </div>
    </div>
  );
}