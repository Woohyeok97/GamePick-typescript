'use client'
import styles from './LikeButton.module.scss'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface LikeButtonProps {
    gameId : string,
}
export default function LikeButton({ gameId } : LikeButtonProps) {
    const session = useSession()
    const queryClient = useQueryClient()

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