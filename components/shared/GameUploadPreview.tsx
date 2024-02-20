'use client'
import styles from './GameUploadPreview.module.scss';
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
        if (game.image instanceof File) {
            setObjectUrl(URL.createObjectURL(game.image));
        } else {
            setObjectUrl(game.image);
        }
        return () => URL.revokeObjectURL(objectUrl);
    }, [game.image]);

    return (
        <div className={ styles.gameUploadPreview }>
            <div className={ styles.gameUploadPreview__preview }>
                <div className={ styles.gameItem }>
                    {objectUrl && <Image src={ objectUrl } width={300} height={250} alt='n' className={ styles.gameItem__img }/>}
                    
                    <div className={ styles.gameItem__infoBox }>
                        <div className={ styles.gameItem__header }>
                            <h1 className={ styles.gameItem__title }>
                                { game?.title } 
                            </h1>
                        </div>
                    
                        <div className={ styles.gameItem__description }>
                            { game?.description }
                        </div>
                        <div className={ styles.gameItem__releasedAt }>
                            { game?.releasedAt } 출시
                        </div>
                    </div>
                </div>
            </div>

            <div className={ styles.gameUploadPreview__inner }>
                <div className={ styles.gameUploadPreview__noti }>
                    <div>이 게임은 이렇게 보일 거예요.</div>
                    <p>업로드 할까요?</p>
                </div>
                <div className={ styles.gameUploadPreview__btnArea }>
                    <button className='btn' onClick={ onSubmit }>업로드</button>
                </div>
            </div>
        </div>
    )
}

// 'use client'
// import styles from './GameUploadPreview.module.scss';
// import { useEffect } from 'react';

// interface GameUploadPreviewProps {
//     children: React.ReactNode;
//     onSubmit: () => void;
//     imageUrl: string;
// }

// export default function GameUploadPreview({ children, onSubmit, imageUrl }: GameUploadPreviewProps ) {
//     useEffect(() => {

//         // 언마운트시, object url 제거 (메모리 누수)
//         return () => {
//             // objectURL인 경우에만 실행
//             if(objectURL.startsWith('blob:')) URL.revokeObjectURL(objectURL)
//         }
//     }, [objectURL])

//     return (
//         <div className={ styles.gameUploadPreview }>
//             <div className={ styles.gameUploadPreview__preview }>
//                 { children }
//             </div>

//             <div className={ styles.gameUploadPreview__inner }>
//                 <div className={ styles.gameUploadPreview__noti }>
//                     <div>이 게임은 이렇게 보일 거예요.</div>
//                     <p>업로드 할까요?</p>
//                 </div>
//                 <div className={ styles.gameUploadPreview__btnArea }>
//                     <button className='btn' onClick={ onSubmit }>업로드</button>
//                 </div>
//             </div>
//         </div>
//     )
// }
