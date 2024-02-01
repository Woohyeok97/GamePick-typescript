'use client'
import axios from "axios"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
// components
import FullOverlayWrap from "@/components/overlayWraps/FullOverlayWrap"
// hooks
import useOverlay from "@/hooks/useOverlay"
// type
import { GameType } from "@/interface"
import GameItem from "@/components/shared/GameItem"
import { ReactNode } from "react"
import GameUploadPreview from "@/components/shared/GameUploadPreview"



export default function GameUploadPage() {
    const { register, handleSubmit, formState : { errors } } = useForm<GameType>()
    const overlay = useOverlay()
    const router = useRouter()
    
    // 게임 업로드
    const onSubmit = async (data : GameType) => {
        try {
            const response = await axios.post(`${process?.env?.NEXT_PUBLIC_GAMES_API}`, data)
            alert('게임을 업로드 하였습니다.')
            router.replace('/games')
        } catch(err) {
            console.log(err)
            alert(err)
        }
    }

    const opneOverlay = (data : GameType) => {

        overlay.open((isOpen, close) => (
            <FullOverlayWrap isOpen={isOpen} close={close}>
                <GameUploadPreview onSubmit={()=>{ onSubmit(data) }}>
                    <GameItem game={data}/>
                </GameUploadPreview>
            </FullOverlayWrap>
        ))
    }


    return (
        <div className="page">
            <div className="page__header">
                <h2>게임 업로드</h2>
            </div>
            
            <form className="form" onSubmit={ handleSubmit(opneOverlay) }>
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
                    {/* <button className="btn" onClick={() => {
                        overlay.open((isOpen, close) => (
                            <FullOverlayWrap isOpen={isOpen} close={close}>
                                
                            </FullOverlayWrap>
                        ))
                    }}>
                        미리보기
                    </button> */}
                    <button type="submit" className="btn">미리보기</button>
                </div>
            </form>
        </div>
    )
}
