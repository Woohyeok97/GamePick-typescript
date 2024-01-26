'use client'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import axios from "axios"
// type
import { GameType } from "@/interface"
import { useEffect } from "react"


interface GameEditPageProps {
    params : { id : string },
}

export default function GameEditPage({ params } : GameEditPageProps) {
    const { register, handleSubmit, formState : { errors }, setValue } = useForm<GameType>()
    const queryClient = new QueryClient()
    const router = useRouter()

    // game fetch
    const gameFetch = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_GAMES_API}/${params?.id}`)
        return response.data as GameType
    }

    // 기존 게임 데이터
    const { data } = useQuery({
        queryKey : [`game_${params.id}`],
        queryFn : gameFetch,
        enabled : !!params.id,
        staleTime : 30000,
        refetchOnWindowFocus : false,
    })

    // form value 변경
    useEffect(() => {
        if(params?.id === data?._id?.toString()) {
            setValue('title', data?.title)
            setValue('releasedAt', data?.releasedAt)
            setValue('trailerUrl', data?.trailerUrl)
            setValue('description', data?.description)
        }

    }, [data])


    const mutation = useMutation({
        mutationFn : async (data : GameType) => {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_GAMES_API}/${params?.id}`, data)
            return response.data
        },
        onSuccess : (data) => {
            queryClient.invalidateQueries({ queryKey : [`game_${params?.id}`] })
            alert('게임을 수정하였습니다.')
        },
        onError : (error) => {
            console.log(error)
        }
    })
    
    // 게임 수정
    const onEditSubmit = async (data : GameType) => {
        mutation.mutate(data)
    }

    // 게임 삭제
    const onDeleteSubmit = async () => {
        const confirm = window.confirm('게임을 삭제할까요?')
        if(!confirm) return

        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_GAMES_API}/${params?.id}`)
            console.log(response.data)
            alert('게임을 삭제하였습니다.')
        } catch(err) {
            console.log(err)
        }
    }



    return (
        <div className="page">
            <div className="page__header">
                <h2>게임 수정</h2>
            </div>
            
            <form className="form" onSubmit={ handleSubmit(onEditSubmit) }>
                <div className="form__block">
                    <label htmlFor="title" className={`${errors?.title?.type == 'required' ? 'form__label-warning' : 'form__label' }`}>
                        타이틀을 입력해주세요.
                    </label>
                    <input type="text" id="title"
                    { ...register('title', { required : true }) }/>
                </div>

                <div className="form__block">
                    <label htmlFor="releasedAt" className={`${errors?.releasedAt?.type == 'required' ? 'form__label-warning' : 'form__label' }`}>
                        발매일을 입력해주세요.
                    </label>
                    <input type="date" id="releasedAt"
                    { ...register('releasedAt', { required : true }) }/>
                </div>

                <div className="form__block">
                    <label htmlFor="trailerUrl" className={`${errors?.trailerUrl?.type == 'required' ? 'form__label-warning' : 'form__label' }`}>
                        트레일러 URL을 입력해주세요.
                    </label>
                    <input type="text" id="trailerUrl"
                    { ...register('trailerUrl', { required : true }) }/>
                </div>

                <div className="form__block">
                    <label htmlFor="image" className={`${errors?.image?.type == 'required' ? 'form__label-warning' : 'form__label' }`}>
                        게임 이미지를 선택해주세요.
                    </label>
                    <input type="file" id="image"
                    { ...register('image') }/>
                </div>

                <div className="form__block">
                    <label htmlFor="description" className={`${errors?.description?.type == 'required' ? 'form__label-warning' : 'form__label' }`}>
                        소개 멘트를 입력해주세요.
                    </label>
                    <textarea id="description" spellCheck={false} rows={4} cols={40} 
                    { ...register("description", { required : true }) } />
                </div>

                <div className="form__btn-area">
                    <button type="submit" className="btn">
                        수정
                    </button>

                    { data?._id && 
                    <button type="button" onClick={ onDeleteSubmit } className="btn">
                        삭제
                    </button> }
                </div>
            </form>
        </div>
    )
}