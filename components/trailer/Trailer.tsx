import YouTube, { YouTubeProps } from 'react-youtube';
import { GameType } from '@/interface';

interface TrailerProps {
  game: GameType;
}

export default function Trailer({ game }: TrailerProps) {
  // onReady
  const onReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };
  // 비디오 옵션
  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <div className="flex justify-center pt-3 mb-5 text-2xl text-fontDarkGray lg:mb-10">
        {game.title}
      </div>
      <div className="relative flex justify-center w-full box-border pt-[56.25%]">
        <YouTube 
          videoId={game.trailerUrl} 
          opts={opts} 
          onReady={onReady}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </>
  );
}