'use client'
// components
import Image from 'next/image';
import FullOverlayWrap from '../overlay/FullOverlayWrap';
import Trailer from './Trailer';
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
    overlay.open((isOpen, close) => ( 
      <FullOverlayWrap isOpen={isOpen} close={close}> 
        <Trailer game={game} />
      </FullOverlayWrap>
    ));
  };

  return (
    <div className="relative w-full cursor-pointer md:basis-[40%]">
      <div className="relative h-[280px] md:w-[620px] mb-4 md:h-[460px] md:mb-0">
        <Image src={game.image} fill alt='n' className="gameImage" priority sizes="100%"/>
      </div>
      <div 
        className="opacity-0 absolute top-0 left-0 w-full h-full bg-black flex justify-end items-end py-[2.5%] px-[4%] box-border hover:opacity-30"
        onClick={handleTrailerOverlayOpen}
      >
        <div className="text-xl text-fontWhite">트레일러 시청하기</div>
      </div>
    </div>
  );
}