'use client'
import styles from './LikeButton.module.scss'
import axios from 'axios'
import { Session } from 'next-auth'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
// type
import { GameType } from '@/interface'


interface LikeButtonProps {
    userLike : string | null,
    game : GameType,
    session : Session | null,
}

export default function LikeButton({ userLike, game, session } : LikeButtonProps) {
    const [ currentLike, setCurrentLike ] = useState(userLike)

    const likeAction = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LIKES_API}/?gameId=${game?._id}`)
        return response.data;
    }
    const likeCancelAction = async () => {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_LIKES_API}/${currentLike}`)
        return response.data;
    }
    
    
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn : async () => {
            if(!currentLike) {
                const userLike = await likeAction()
                return userLike
            } else {
                await likeCancelAction()
                return null
            }
        },
        onSuccess : (data) => {
            // 현재 요청 결과를 저장
           setCurrentLike((prev) => prev ? null : data.insertedId)
        },
        onError: (err) => {
            alert(`${err} : 요청에 실패했습니다. 다시한번 시도해주세요.`)
            // 요청실패시, 이전 데이터로 롤백
            setCurrentLike((prev) => prev)
        },
    })

    const handleClick = () => {
        if(isPending) return
        mutate()
    }

    console.log(isPending)
    console.log(currentLike)

    // 분기) 로그인 정보가 없을때
    if(!session?.user) return (
        <div className={ styles.likeButton__btn }>하트</div>
    )
    
    // 분기) 좋아요 정보가 없을때
    if(!currentLike) return (
        <div className={ styles.likeButton }>
            <div className={ isPending ? `${styles.likeButton__btnActive}` : `${ styles.likeButton__btn}`}
                onClick={ handleClick }>
                하트
            </div>
        </div>
    )

    // 분기) 좋아요 정보 있을때
    if(currentLike) return (
        <div className={ styles.likeButton }>
            <div className={ isPending ? `${styles.likeButton__btn}` : `${ styles.likeButton__btnActive}`} 
                onClick={ handleClick }>
                하트
            </div>
        </div>
    )

}
// 'use client'
// import styles from './LikeButton.module.scss'
// import { useSession } from 'next-auth/react'
// import axios from 'axios'
// import { useQuery, useQueryClient } from '@tanstack/react-query'
// import { useRouter } from 'next/navigation'

// interface LikeButtonProps {
//     gameId : string,
// }
// export default function LikeButton({ gameId } : LikeButtonProps) {
//     const session = useSession()
//     const queryClient = useQueryClient()
//     const router = useRouter()

//     // like fetch
//     const fetchIsLike = async () => {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_LIKES_API}/?gameId=${gameId}`)
//         return response.data
//     }

//     const { data } = useQuery({
//         queryKey : [`isLike`, `${gameId}`],
//         queryFn : fetchIsLike,
//         enabled : !!session?.data,
//         staleTime : Infinity,
//         refetchOnWindowFocus : false,
//     })

//     // 좋아요
//     const toggleLike = async () => {
//         if(!session.data) {
//             alert('로그인 이후 이용해주세요.')
//             return
//         }

//         try {
//             await axios.post(`${process.env.NEXT_PUBLIC_LIKES_API}`, { gameId })
//             queryClient.invalidateQueries({ queryKey : [`isLike`, `${gameId}`]})

//         } catch(err) {
//             console.log(err)
//         } finally {
//             // router.refresh() // 클라이언트 컴포넌트에서 router.refresh()를 사용해서 현재경로를 새로고치고, 서버컴포넌트의 fetch를 재실행함
//         }
//     }

//     // 좋아요 취소
//     const toggleCancel = async () => {
//         if(!session.data) {
//             alert('로그인 이후 이용해주세요.')
//             return
//         }

//         try {
//             await axios.delete(`${process.env.NEXT_PUBLIC_LIKES_API}/${data?._id}`)
//             queryClient.invalidateQueries({ queryKey : [`isLike`, `${gameId}`]})
//         } catch(err) {
//             console.log(err)
//         } finally {
//             // router.refresh()
//         }
//     }


//     return (
//         <div className={ styles.likeButton }>
//             { data ? 
//             <div className={ styles.likeButton__btnActive } onClick={ toggleCancel }>
//                 하트
//             </div>
//             : 
//             <div className={ styles.likeButton__btn } onClick={ toggleLike }>
//                 하트
//             </div>
//             }
//         </div>
//     )
// }