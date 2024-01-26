'use client'
import styles from './LikeButton.module.scss'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface LikeButtonProps {
    gameId : string,
}
export default function LikeButton({ gameId } : LikeButtonProps) {
    const session = useSession()
    const queryClient = useQueryClient()
    const router = useRouter()

    // like fetch
    const fetchIsLike = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_LIKES_API}`, { params : { gameId} })
        console.log('fetxh')
        return response.data
    }

    const { data } = useQuery({
        queryKey : [`isLike`, `${gameId}`],
        queryFn : fetchIsLike,
        enabled : !!session?.data,
        staleTime : Infinity,
        refetchOnWindowFocus : false,
    })

    // 좋아요
    const toggleLike = async () => {
        if(!session.data) {
            alert('로그인 이후 이용해주세요.')
            return
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_LIKES_API}`, { gameId })
            queryClient.invalidateQueries({ queryKey : [`isLike`, `${gameId}`]})

        } catch(err) {
            console.log(err)
        } finally {
            router.refresh() // 클라이언트 컴포넌트에서 router.refresh()를 사용해서 현재경로를 새로고치고, 서버컴포넌트의 fetch를 재실행함
        }
    }

    // 좋아요 취소
    const toggleCancel = async () => {
        if(!session.data) {
            alert('로그인 이후 이용해주세요.')
            return
        }

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_LIKES_API}/${data?._id}`)
            queryClient.invalidateQueries({ queryKey : [`isLike`, `${gameId}`]})
        } catch(err) {
            console.log(err)
        } finally {
            router.refresh()
        }
    }


    return (
        <div className={ styles.likeButton }>
            { data ? 
            <div className={ styles.likeButton__btnActive } onClick={ toggleCancel }>
                하트
            </div>
            : 
            <div className={ styles.likeButton__btn } onClick={ toggleLike }>
                하트
            </div>
            }
        </div>
    )
}