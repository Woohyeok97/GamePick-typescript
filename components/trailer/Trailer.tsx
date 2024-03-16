// react-youtube
import YouTube, { YouTubeProps } from 'react-youtube';


interface TrailerProps {
  videoId: string;
}

export default function Trailer({ videoId }: TrailerProps) {
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
      <div className="flex justify-center pt-3 mb-5 text-fontDarkGray lg:mb-10">
        어떤 게임 트레일러
      </div>
      <div className="relative flex justify-center w-full box-border pt-[56.25%]">
        <YouTube 
          videoId={videoId} 
          opts={opts} 
          onReady={onReady}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </>
  );
}