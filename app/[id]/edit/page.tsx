'use client'
import { useEffect, useRef } from "react";
import { useForm, Controller, useController } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
// hooks
import useOverlay from "@/hooks/useOverlay";
// type
import { GameFormType, GameType } from "@/interface";
import FullOverlayWrap from "@/components/overlayWraps/FullOverlayWrap";
import GameUploadPreview from "@/components/shared/GameUploadPreview";
import GameItem from "@/components/shared/GameItem"
import { fetchGameById } from "@/app/remotes/axois/gameAPI";
import { GameFormSchema } from "@/app/zod";
import { zodResolver } from "@hookform/resolvers/zod";


interface GameEditPageProps {
    params: { id: string },
}

type GameFormKeys = keyof GameFormType;

export default function GameEditPage({ params }: GameEditPageProps) {
    const { register, handleSubmit, formState: { errors }, setValue, getValues, control } = useForm<GameFormType>({ 
        resolver: zodResolver(GameFormSchema),
    });
    const queryClient = useQueryClient();
    const overlay = useOverlay();
    const router = useRouter();
    
    // 기존 게임 데이터
    const { data: prevData } = useQuery({
        queryKey: [`game_${params.id}`],
        queryFn: () => fetchGameById(params?.id),
        enabled: !!params.id,
        staleTime: 3000,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (prevData && GameFormSchema.parse(prevData)) {
            Object.keys(prevData).forEach(key => setValue(key as GameFormKeys, prevData[key as GameFormKeys]));
        }
    }, [prevData]);

    const { field: imageField } = useController({
        name: 'image',
        control: control,
    });

    const setimage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file && file[0]) {
            imageField.onChange(file[0]);
        } else if(prevData?.image) {
            imageField.onChange(prevData.image);
        }
    };
    const mutation = useMutation({
        mutationFn : async (data: GameFormType) => {
            if (data.image instanceof File) {
                const imageURL = await uploadImage(data.image);
                data = { ...data, image: imageURL as string };
            }
            const response = await axios.put(`${process.env.NEXT_PUBLIC_GAMES_API}/${data._id}`, data)
            return response;
        },
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey: [`game_${params?.id}`] })
            alert('게임을 수정하였습니다.');
            router.replace('/');
        },
        onError : (error) => {
            console.log(error);
        },
    })
    
    // // 게임 수정
    // const onEditSubmit = async (data : GameType) => {
    //     mutation.mutate(data)
    // }

    // 게임 삭제
    // const onDeleteSubmit = async () => {
    //     const confirm = window.confirm('게임을 삭제할까요?')
    //     if(!confirm) return

    //     try {
    //         const response = await axios.delete(`${process.env.NEXT_PUBLIC_GAMES_API}/${params?.id}`)
    //         console.log(response.data)
    //         alert('게임을 삭제하였습니다.')
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    async function uploadImage(file: File) {
        const fileName = encodeURIComponent(file?.name);
        try {
            // 서버로부터 presignedURL 받아오기
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_AWS_S3_API}` + `/${fileName}`);
            
            // req.body 작업처리
            const formData = new FormData();
            Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
                formData.append(key, value as string);
            });

            // s3 이미지 업로드 / URL반환
            const imageURL = await axios.post(data.url, formData);
            return `${imageURL.config.url}/${fileName}`

        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = (data: GameFormType) => {
        overlay.open((isOpen, close) => (
            <FullOverlayWrap isOpen={isOpen} close={close}>
                <GameUploadPreview game={data} onSubmit={() => mutation.mutate(data)} />
            </FullOverlayWrap>
        ))
    };
    
    return (
        <div className="page">
            <div className="page__header">
                <h2>게임 수정</h2>
            </div>
            
            <form className="form" onSubmit={ handleSubmit(handleClick) }>
                
                <div className="form__block">
                    <label htmlFor="title" className="form__label">
                        타이틀을 입력해주세요.
                    </label>
                    <input type="text" id="title"
                    { ...register('title', { required : true }) }/>
                    {errors.title && <p className="form__label-warning">{errors.title.message}</p>}
                </div>

                <div className="form__block">
                    <label htmlFor="releasedAt" className="form__label">
                        발매일을 입력해주세요.
                    </label>
                    <input type="date" id="releasedAt"
                    { ...register('releasedAt', { required : true }) }/>
                    {errors.releasedAt && <p className='form__label-warning'>{errors.releasedAt.message}</p>}
                </div>

                <div className="form__block">
                    <label htmlFor="trailerUrl" className="form__label">
                        트레일러 URL을 입력해주세요.
                    </label>
                    <input type="text" id="trailerUrl"
                    { ...register('trailerUrl', { required : true }) }/>
                    {errors.trailerUrl && <p className='form__label-warning'>{errors.trailerUrl.message}</p>}
                </div>
                <div className="form__block">
                    <label htmlFor="image" className="form__label">
                        게임 이미지를 선택해주세요.
                    </label>
                    <input type="file" onChange={(e) => setimage(e)} />
                    {errors.image && <p className="form__label-warning">{errors.image.message}</p>}
                </div>

                <div className="form__block">
                    <label htmlFor="description" className="form__label">
                        소개 멘트를 입력해주세요.
                    </label>
                    <textarea id="description" spellCheck={false} rows={4} cols={40} 
                    { ...register("description", { required : true }) } />
                    {errors.description && <p className="form__label-warning">{errors.description.message}</p>}
                </div>

                <div className="form__btn-area">
                    <button type="submit" className="btn">미리보기</button>
                </div>
            </form>
        </div>
    )
}