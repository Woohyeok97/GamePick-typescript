'use client'

import styles from './LikeButton.module.scss'
import axios from 'axios'
import { Session } from 'next-auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// type
import { GameType, LikeType } from '@/interface'


interface LikeButtonProps {
    game: GameType;
    userLike : LikeType;
    session: Session | null;
}

export default function LikeButton({ game, userLike, session }: LikeButtonProps) {
    const queryClient = useQueryClient();

    // 현재 game?._id의 userLike를 캐시로 관리해서 전역적으로 사용
    // 캐시데이터를 사용하기 위해 useQuery 사용(데이터 fetching은 안하고 캐시데이터 관리용)
    const { data: currentLikeId } = useQuery({
        queryKey: [`like`, `${game?._id}`], 
        enabled: !!session?.user,
        initialData: () => {
            queryClient.setQueryData([`like`, `${game?._id}`], userLike?._id);
            return queryClient.getQueryData([`like`, `${game?._id}`]);
        },
    });

    // 좋아요 생성 요청
    const createUserLike = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LIKES_API}/?gameId=${game?._id}`);
        return response.data?.insertedId; // insertedId를 반환
    };
    const deleteUserLike = async () => {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_LIKES_API}/${currentLikeId}`);
        return response.data;
    };
    
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            if (!currentLikeId) {
                const userLike = await createUserLike();
                return userLike;
            } else {
                await deleteUserLike();
                return null; // undifined값으로는 캐시데이터를 없데이트할 수 없기때문에 null 반환
            }
        },
        onMutate: async () => {
            // 해당 쿼리키로 현재 진행중인 데이터 fetch취소(나는 useQuery로 fetching은 하지않아서 필요없음)
            // await queryClient.cancelQueries({ queryKey : [`like`, `${game?._id}`] })

            // 만약 다른 컴포넌트에서도 옵티미스틱 업데이트가 필요하다면, 여기서 캐시데이터를 임시값으로 업데이트

            // 현재 캐시데이터 반환(요청 실패시, 롤백 대비용)
            const previousUserLike = queryClient.getQueryData([`like`, `${game?._id}`]);

            return { previousUserLike };
        }, 
        onSuccess: data => {
            // 현재 요청 결과를 캐시데이터에 저장
            queryClient.setQueryData([`like`, `${game?._id}`], data);
        },
        onError: (err, _, context) => {
            // 요청실패시, 이전 데이터로 롤백
            alert(`${err} : 요청에 실패했습니다. 다시한번 시도해주세요.`);
            queryClient.setQueryData([`like`, `${game?._id}`], context?.previousUserLike);
        },
    })

    // 옵티미스틱 업데이트 & 요청 핸들러
    const handleClick = () => {
        if (isPending) return;

        mutate();
    };
    

    // 분기 ) 로그인 정보가 없을때
    if (!session?.user) return (
        <div className={ styles.likeButton }>
            <div className={ styles.likeButton__btn } onClick={() => alert('로그인 이후 이용해주세요.')}>
                하트
            </div>
        </div>
    );
    
    // 분기 ) 좋아요 정보가 없을때
    if (!currentLikeId) return (
        <div className={ styles.likeButton }>
            <div className={ isPending ? `${styles.likeButton__btnActive}` : `${styles.likeButton__btn}`}
                onClick={ handleClick }>
                하트
            </div>
        </div>
    );

    // 분기) 좋아요 정보 있을때
    if (currentLikeId) return (
        <div className={ styles.likeButton }>
            <div className={ isPending ? `${styles.likeButton__btn}` : `${styles.likeButton__btnActive}`} 
                onClick={ handleClick }>
                하트
            </div>
        </div>
    );
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