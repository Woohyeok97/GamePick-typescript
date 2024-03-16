import { useEffect, useState } from 'react';
import Image from 'next/image';
// type
import { GameFormType } from '@/interface';

interface GameUploadPreviewProps {
  game: GameFormType;
  onSubmit: () => void;
}

export default function GameUploadPreview({ game, onSubmit }: GameUploadPreviewProps ) {
  const [objectUrl, setObjectUrl] = useState<string>('');

  useEffect(() => {
    if (game.image && game.image instanceof File) {
      return setObjectUrl(URL.createObjectURL(game.image));
    }
    if (game.image) {
      return setObjectUrl(game.image);
    }
    return () => URL.revokeObjectURL(objectUrl);
  }, [game.image]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col items-center justify-between w-full gap-3 mt-12 md:flex-row md:gap-10">
        {objectUrl && <Image src={objectUrl} width={300} height={250} alt='n' />}

        <div className="flex flex-col flex-grow w-full">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-bold lg:text-4xl">{game?.title}</h1>
          </div>
          
          <div className="mb-5 lg:text-xl">{game?.description}</div>
          <div className="mb-5 text-fontGray">{game?.releasedAt} 출시</div>
        </div>
      </div>
      
      <div>
        <>
          <div className="mb-2 text-md text-fontDarkGray md:text-xl">이 게임은 이렇게 보일 거예요.</div>
          <p className="text-lg md:text-3xl">업로드 할까요?</p>
        </>
        <div className="flex justify-center w-full mt-5 lg:mt-12">
          <button className='w-full btn' onClick={onSubmit}>업로드</button>
        </div>
      </div>
    </div>
  );
}