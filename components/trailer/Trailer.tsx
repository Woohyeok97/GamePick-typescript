import styles from './Trailer.module.scss'
// react-youtube
import YouTube, { YouTubeProps } from 'react-youtube'


interface TrailerProps {
    videoId : string,
}

export default function Trailer({ videoId } : TrailerProps) {
    
    // onReady
    const onReady : YouTubeProps['onReady'] = (event) => {
        event.target.pauseVideo();
    }

    // 비디오 옵션
    const opts: YouTubeProps['opts'] = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div className={ styles.trailer }>
            <div className={ styles.trailer__header }>어떤 게임 트레일러</div>
            <div className={ styles.trailer__inner }>
                <YouTube 
                    videoId={ videoId } 
                    opts={opts} 
                    onReady={onReady}
                    className={ styles.trailer__youtube }
                />
            </div>
        </div>
    )
}