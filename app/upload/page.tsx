'use client'
import axios from "axios"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
// components
import FullOverlayWrap from "@/components/overlayWraps/FullOverlayWrap"
import GameItem from "@/components/shared/GameItem"
import GameUploadPreview from "@/components/shared/GameUploadPreview"
// hooks
import useOverlay from "@/hooks/useOverlay"
// type
import { GameType } from "@/interface"


export default function GameUploadPage() {
    const { register, handleSubmit, formState : { errors } } = useForm()
    const overlay = useOverlay()
    const router = useRouter()
    
    // 게임 업로드
    const onSubmit = async (data : any) => {
        try {
            const imageURL = await uploadImage(data.image[0])
            const formData = { ...data, image : imageURL }

            await axios.post(`${process?.env?.NEXT_PUBLIC_GAMES_API}`, formData)
            alert('게임을 업로드 하였습니다.')
            router.replace('/games')

        } catch(err) {
            console.log(err)
            alert(err)
        }
    }


    // preview 열기
    const openUploadPreview = (data : any) => {
        const objectURL = URL.createObjectURL(data.image[0] as File)

        overlay.open((isOpen, close) => (
            <FullOverlayWrap isOpen={isOpen} close={close}>
                <GameUploadPreview onSubmit={() => onSubmit(data)} objectURL={objectURL}>
                    {/* <GameItem game={{ ...data, image : objectURL }}/> */}
                    <div>임시</div>
                </GameUploadPreview>
            </FullOverlayWrap>
        ))
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
                <h2>게임 업로드</h2>
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
                    <input 
                        type="file" id="image"
                        { ...register('image', { required : true }) }/>
                </div>

                <div className="form__block">
                    <label htmlFor="description" className={`${errors?.description?.type == 'required' ? 'form__label-warning' : 'form__label' }`}>
                        소개 멘트를 입력해주세요.
                    </label>
                    <textarea id="description" spellCheck={false} rows={4} cols={40} 
                    { ...register("description", { required : true }) } />
                </div>

                <div className="form__btn-area">
                    <button type="submit" className="btn">미리보기</button>
                </div>
            </form>
        </div>
    )
}
