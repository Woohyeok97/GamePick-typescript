'use client'
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useController, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
// type & schema
import { GameFormSchema } from '@/app/zod';
import { GameFormType } from '@/interface';
// remotes
import { fetchGameById, updateGameById } from '@/app/remotes/axois/gameAPI';
import { createImage } from '@/app/remotes/axois/imageAPI';
// components
import MutltiForm from '@/components/shared/MultiForm';
import FullOverlayWrap from '@/components/overlayWraps/FullOverlayWrap';
import GameUploadPreview from '@/components/shared/GameUploadPreview';
// hooks
import useOverlay from '@/hooks/useOverlay';



interface GameEditPageProps {
  params: { id: string };
}
export default function GameEditPage({ params }: GameEditPageProps) {
  const router = useRouter();
  const overlay = useOverlay();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, setValue, control, getValues } = useForm<GameFormType>({
    resolver: zodResolver(GameFormSchema),
  });
  
  
  const { data: prevGame } = useQuery({
    queryKey: ['game', `${params.id}`],
    queryFn: () => fetchGameById(params.id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (prevGame && GameFormSchema.parse(prevGame)) {
      Object.keys(prevGame).forEach(key => {
        const field = key as keyof GameFormType;
        setValue(field, prevGame[field]);
      });
    }
  }, [params.id, prevGame]);

  const { field: imageField } = useController({
    name: 'image',
    control: control,
  });

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if (file && file[0]) {
      imageField.onChange(file[0])
    } else if (prevGame?.image) {
      imageField.onChange(prevGame.image)
    }
  };

  const mutation = useMutation({
    mutationFn : async (data: GameFormType) => {
      if (data.image instanceof File) {
          const imageURL = await createImage(data.image);
          data = { ...data, image: imageURL as string };
      }
      const response = await updateGameById(params.id, data);
      return response;
    },
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: [`game_${params?.id}`] });
      alert('게임을 수정하였습니다.');
      router.replace('/');
    },
    onError : (error) => {
      console.log(error);
    },
  });
  
  const handleClick = (data: GameFormType) => {
    overlay.open((isOpen, close) => (
      <FullOverlayWrap isOpen={isOpen} close={close}>
        <GameUploadPreview game={data} onSubmit={() => mutation.mutate(data)} />
      </FullOverlayWrap>
    ));
  };

  return (
    <div className='page'>
      <div className="page__header">
        <h2>게임 수정</h2>
      </div>
      <MutltiForm onSubmit={handleSubmit(handleClick)} errors={errors}>
        <MutltiForm.TextField label='title' fieldProps={{ ...register('title') }}/>
        <MutltiForm.DateField label='releasedAt' fieldProps={{ ...register('releasedAt') }}/>
        <MutltiForm.TextField label='trailerUrl' fieldProps={{ ...register('trailerUrl') }}/>
        <MutltiForm.FileField label='image' fieldProps={{ onChange: onChangeImage }}/>
        <MutltiForm.TextareaField label='description' fieldProps={{ ...register('description') }}/>
        <div className="form__btn-area">
          <button type='submit' className='btn'>
            미리보기
          </button>
        </div>
      </MutltiForm>
    </div>
  );
}




// 'use client'
// import { useRouter } from "next/navigation";
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // components
// import FullOverlayWrap from "@/components/overlayWraps/FullOverlayWrap";
// import GameUploadPreview from "@/components/shared/GameUploadPreview";
// import MultiForm from "@/components/form/MultiForm";
// // hooks
// import useOverlay from "@/hooks/useOverlay";
// // type
// import { GameFormType } from "@/interface";
// // remotes
// import { fetchGameById, updateGameById } from "@/app/remotes/axois/gameAPI";
// import { createImage } from "@/app/remotes/axois/imageAPI";
// import { FormProvider, useController, useForm } from "react-hook-form";
// import { GameFormSchema } from "@/app/zod";
// import { useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";


// interface GameEditPageProps {
//   params: { id: string };
// }
// export default function GameEditPage({ params }: GameEditPageProps) {
//   const { register, handleSubmit, formState: { errors }, setValue, control, getValues } = useForm<GameFormType>({
//     resolver: zodResolver(GameFormSchema),
//   });
//   // 기존 게임 데이터
//   const { data: prevData } = useQuery({
//     queryKey: [`game_${params.id}`],
//     queryFn: () => fetchGameById(params?.id),
//     enabled: !!params.id,
//     staleTime: 3000,
//     refetchOnWindowFocus: false,
//   });

//   // 기존 게임이 있다면, form 필드 변경
//   useEffect(() => {
//     if (prevData && GameFormSchema.parse(prevData)) {
//       Object.keys(prevData).forEach(key => {
//         const field = key as keyof GameFormType;
//         setValue(field , prevData[field]);
//       });
//     }
//   }, [prevData]);

//   // 이미지 파일 컨트롤러
//   const { field: imageField } = useController({
//     name: 'image',
//     control: control,
//   });

//   const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files;
//     if (file && file[0]) {
//       setValue(imageField.name, file[0]);
//     } else if (prevData?.image) {
//       setValue(imageField.name, prevData.image);
//     } else {
//       setValue(imageField.name, '');
//     }
//   };
//   const queryClient = useQueryClient();
//   const overlay = useOverlay();
//   const router = useRouter();
    
  

//   const mutation = useMutation({
//     mutationFn : async (data: GameFormType) => {
//       if (data.image instanceof File) {
//           const imageURL = await createImage(data.image);
//           data = { ...data, image: imageURL as string };
//       }
//       const response = await updateGameById(params.id, data);
//       return response;
//     },
//     onSuccess : () => {
//       queryClient.invalidateQueries({ queryKey: [`game_${params?.id}`] });
//       alert('게임을 수정하였습니다.');
//       router.replace('/');
//     },
//     onError : (error) => {
//       console.log(error);
//     },
//   });

//     // 게임 삭제
//     // const onDeleteSubmit = async () => {
//     //     const confirm = window.confirm('게임을 삭제할까요?')
//     //     if(!confirm) return

//     //     try {
//     //         const response = await axios.delete(`${process.env.NEXT_PUBLIC_GAMES_API}/${params?.id}`)
//     //         console.log(response.data)
//     //         alert('게임을 삭제하였습니다.')
//     //     } catch(err) {
//     //         console.log(err)
//     //     }
//     // }
//   // 미리보기 오픈 핸들러
//   const handleClick = (data: GameFormType) => {
//     overlay.open((isOpen, close) => (
//       <FullOverlayWrap isOpen={isOpen} close={close}>
//         <GameUploadPreview game={data} onSubmit={() => mutation.mutate(data)} />
//       </FullOverlayWrap>
//     ));
//   };

//   return (
//     <div className="page">
//       <div className="page__header">
//         <h2>게임 수정</h2>
//         <button onClick={() => console.log(getValues('title'))}>cl</button>
//       </div>
//         <MultiForm prevData={prevData} onSubmit={handleSubmit(handleClick)} control={
//           <div className="form__btn-area">
//             <button type="submit" className="btn">
//               미리보기
//             </button>
//           </div>
//         }>
//           <MultiForm.TextField label='title' fieldProps={{ ...register('title') }} />
//           <MultiForm.DateField label='releasedAt' fieldProps={{ ...register('title') }}/>
//           <MultiForm.TextField label='trailerUrl' fieldProps={{ ...register('trailerUrl') }} />
//           <MultiForm.FileField label='image' />
//           <MultiForm.TextAreaField label='description' fieldProps={{ ...register('trailerUrl') }} />
//         </MultiForm>
//     </div>
//   );
// }

// 'use client'
// import { useRouter } from "next/navigation";
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // components
// import FullOverlayWrap from "@/components/overlayWraps/FullOverlayWrap";
// import GameUploadPreview from "@/components/shared/GameUploadPreview";
// import MutltiForm from "@/components/form/MultiForm";
// // hooks
// import useOverlay from "@/hooks/useOverlay";
// // type
// import { GameFormType } from "@/interface";
// // remotes
// import { fetchGameById, updateGameById } from "@/app/remotes/axois/gameAPI";
// import { createImage } from "@/app/remotes/axois/imageAPI";


// interface GameEditPageProps {
//   params: { id: string };
// }
// export default function GameEditPage({ params }: GameEditPageProps) {
//   const queryClient = useQueryClient();
//   const overlay = useOverlay();
//   const router = useRouter();
    
//   // 기존 게임 데이터
//   const { data: prevData } = useQuery({
//     queryKey: [`game_${params.id}`],
//     queryFn: () => fetchGameById(params?.id),
//     enabled: !!params.id,
//     staleTime: 3000,
//     refetchOnWindowFocus: false,
//   });

//   const mutation = useMutation({
//     mutationFn : async (data: GameFormType) => {
//       if (data.image instanceof File) {
//           const imageURL = await createImage(data.image);
//           data = { ...data, image: imageURL as string };
//       }
//       const response = await updateGameById(params.id, data);
//       return response;
//     },
//     onSuccess : () => {
//       queryClient.invalidateQueries({ queryKey: [`game_${params?.id}`] });
//       alert('게임을 수정하였습니다.');
//       router.replace('/');
//     },
//     onError : (error) => {
//       console.log(error);
//     },
//   });

//     // 게임 삭제
//     // const onDeleteSubmit = async () => {
//     //     const confirm = window.confirm('게임을 삭제할까요?')
//     //     if(!confirm) return

//     //     try {
//     //         const response = await axios.delete(`${process.env.NEXT_PUBLIC_GAMES_API}/${params?.id}`)
//     //         console.log(response.data)
//     //         alert('게임을 삭제하였습니다.')
//     //     } catch(err) {
//     //         console.log(err)
//     //     }
//     // }
//   // 미리보기 오픈 핸들러
//   const handleClick = (data: GameFormType) => {
//     overlay.open((isOpen, close) => (
//       <FullOverlayWrap isOpen={isOpen} close={close}>
//         <GameUploadPreview game={data} onSubmit={() => mutation.mutate(data)} />
//       </FullOverlayWrap>
//     ));
//   };

//   return (
//     <div className="page">
//       <div className="page__header">
//         <h2>게임 수정</h2>
//       </div>
//       <MutltiForm prevData={prevData} onClick={handleClick} />
//     </div>
//   );
// }
