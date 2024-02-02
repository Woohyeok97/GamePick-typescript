'use client'
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from "axios"
// hooks
import useOverlay from "@/hooks/useOverlay"
// type
import { GameType } from "@/interface"
import FullOverlayWrap from "@/components/overlayWraps/FullOverlayWrap"
import GameUploadPreview from "@/components/shared/GameUploadPreview"
import GameItem from "@/components/shared/GameItem"


interface GameEditPageProps {
    params : { id : string },
}

export default function GameEditPage({ params } : GameEditPageProps) {
    const { register, handleSubmit, formState : { errors }, setValue, getValues, watch } = useForm()
    const queryClient = useQueryClient()
    const overlay = useOverlay()
    const router = useRouter()

    // game fetch
    const gameFetch = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_GAMES_API}/${params?.id}`)
        // zod 써볼까?(response타입처리)
        return response.data
    }

    // 기존 게임 데이터
    const { data : prevData } = useQuery({
        queryKey : [`game_${params.id}`],
        queryFn : gameFetch,
        enabled : !!params.id,
        staleTime : 3000,
        refetchOnWindowFocus : false,
    })

    // form value 변경
    useEffect(() => {
        if(params?.id === prevData?._id?.toString()) {
            setValue('title', prevData?.title)
            setValue('releasedAt', prevData?.releasedAt)
            setValue('trailerUrl', prevData?.trailerUrl)
            setValue('description', prevData?.description)
            setValue('image', prevData.image)
        }

    }, [prevData])
   

    const mutation = useMutation({
        mutationFn : async (data : any) => {
            
            if(data.image instanceof FileList) {
                const imageURL = await uploadImage(data.image[0])
                data = { ...data, image : imageURL }
            } 

            const response = await axios.put(`${process.env.NEXT_PUBLIC_GAMES_API}/${params?.id}`, data)
            return response.data
        },
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey : [`game_${params?.id}`] })
            alert('게임을 수정하였습니다.')
            router.replace('/games')
        },
        onError : (error) => {
            console.log(error)
        }
    })
    
    // 게임 수정
    const onEditSubmit = async (data : GameType) => {
        mutation.mutate(data)
    }

    // preview 열기
    const openUploadPreview = (data : any) => {
        let imageURL = ''

        // 이미지 파일을 선택했을경우 : objectURL 생성
        if(data.image instanceof FileList && data.image.length > 0) {
            imageURL = URL.createObjectURL(data.image[0])

        // 이미지 파일 선택후 취소 or 미선택 : 기존의 이미지url 사용
        } else {
            imageURL = prevData.image;
            data = { ...data, image : prevData.image }
        }

        overlay.open((isOpen, close) => (
            <FullOverlayWrap isOpen={isOpen} close={close}>
                <GameUploadPreview onSubmit={() => onEditSubmit(data)} objectURL={imageURL}>
                    <GameItem game={{ ...data, image : imageURL }}/>
                </GameUploadPreview>
            </FullOverlayWrap>
        ))
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

    async function uploadImage(file : File) {
        const fileName = encodeURIComponent(file?.name)

        try {
            // 서버로부터 presignedURL 받아오기
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_AWS_S3_API}` + `/${fileName}`)
            
            // req.body 작업처리
            const formData = new FormData()
            Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
                formData.append(key, value as string)
            })

            // s3 이미지 업로드 / URL반환
            const imageURL = await axios.post(data.url, formData)
            return `${imageURL.config.url}/${fileName}`

        } catch(err) {
            console.log(err)
        }
    }

   
    return (
        <div className="page">
            <div className="page__header">
                <h2>게임 수정</h2>
            </div>
            
            <form className="form" onSubmit={ handleSubmit(openUploadPreview) }>
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
                    { ...register("image") }
                    />
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
                        미리보기
                    </button>

                    { prevData?._id && 
                    <button type="button" onClick={ onDeleteSubmit } className="btn">
                        삭제
                    </button> }
                </div>
            </form>
        </div>
    )
}