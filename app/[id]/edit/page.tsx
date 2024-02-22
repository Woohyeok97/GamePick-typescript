'use client'
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// components
import FullOverlayWrap from "@/components/overlayWraps/FullOverlayWrap";
import GameUploadPreview from "@/components/shared/GameUploadPreview";
import MutltiForm from "@/components/form/MultiForm";
// hooks
import useOverlay from "@/hooks/useOverlay";
// type
import { GameFormType } from "@/interface";
// remotes
import { fetchGameById, updateGameById } from "@/app/remotes/axois/gameAPI";
import { uploadImage } from "@/app/remotes/axois/imageAPI";


interface GameEditPageProps {
  params: { id: string };
}
export default function GameEditPage({ params }: GameEditPageProps) {
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

  const mutation = useMutation({
    mutationFn : async (data: GameFormType) => {
      if (data.image instanceof File) {
          const imageURL = await uploadImage(data.image);
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

  const handleClick = (data: GameFormType) => {
    overlay.open((isOpen, close) => (
      <FullOverlayWrap isOpen={isOpen} close={close}>
        <GameUploadPreview game={data} onSubmit={() => mutation.mutate(data)} />
      </FullOverlayWrap>
    ));
  };

  return (
    <div className="page">
      <div className="page__header">
        <h2>게임 수정</h2>
      </div>
      <MutltiForm prevData={prevData} onClick={handleClick} />
    </div>
  );
}

// 'use client'
// import { useEffect } from "react";
// import { useForm, useController } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // hooks
// import useOverlay from "@/hooks/useOverlay";
// // type
// import { GameFormType } from "@/interface";
// import FullOverlayWrap from "@/components/overlayWraps/FullOverlayWrap";
// import GameUploadPreview from "@/components/shared/GameUploadPreview";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { GameFormSchema } from "@/app/zod";
// // remotes
// import { fetchGameById, updateGameById } from "@/app/remotes/axois/gameAPI";
// import { uploadImage } from "@/app/remotes/axois/imageAPI";


// interface GameEditPageProps {
//   params: { id: string };
// }

// type GameFormKeys = keyof GameFormType;

// export default function GameEditPage({ params }: GameEditPageProps) {
//   const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<GameFormType>({ 
//       resolver: zodResolver(GameFormSchema),
//   });
//   const queryClient = useQueryClient();
//   const overlay = useOverlay();
//   const router = useRouter();
    
//   // 기존 게임 데이터
//   const { data: prevData } = useQuery({
//       queryKey: [`game_${params.id}`],
//       queryFn: () => fetchGameById(params?.id),
//       enabled: !!params.id,
//       staleTime: 3000,
//       refetchOnWindowFocus: false,
//   });

//   useEffect(() => {
//       if (prevData && GameFormSchema.parse(prevData)) {
//           Object.keys(prevData).forEach(k => {
//             const key = k as GameFormKeys
//             setValue(key, prevData[key])
//           });
//       }
//   }, [prevData]);

//   const { field: imageField } = useController({
//       name: 'image',
//       control: control,
//   });

//   const setimage = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files;
//       if (file && file[0]) {
//           imageField.onChange(file[0]);
//       } else if(prevData?.image) {
//           imageField.onChange(prevData.image);
//       }
//   };

//   const mutation = useMutation({
//     mutationFn : async (data: GameFormType) => {
//         if (data.image instanceof File) {
//             const imageURL = await uploadImage(data.image);
//             data = { ...data, image: imageURL as string };
//         }
//         const response = await updateGameById(params.id, data);
//         return response;
//     },
//     onSuccess : () => {
//         queryClient.invalidateQueries({ queryKey: [`game_${params?.id}`] })
//         alert('게임을 수정하였습니다.');
//         router.replace('/');
//     },
//     onError : (error) => {
//         console.log(error);
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

//   const handleClick = (data: GameFormType) => {
//       overlay.open((isOpen, close) => (
//           <FullOverlayWrap isOpen={isOpen} close={close}>
//               <GameUploadPreview game={data} onSubmit={() => mutation.mutate(data)} />
//           </FullOverlayWrap>
//       ))
//   };
//   console.log('render')
//   return (
//     <div className="page">
//         <div className="page__header">
//             <h2>게임 수정</h2>
//         </div>
        
//         <form className="form" onSubmit={ handleSubmit(handleClick) }>
//             <div className="form__block">
//               <label htmlFor="title" className="form__label">
//                   제목을 입력해주세요.
//               </label>
//               <input type="text" id="title" { ...register('title') } />
//               {errors.title && <p className="form__label-warning">{errors.title.message}</p>}
//             </div>

//             <div className="form__block">
//               <label htmlFor="releasedAt" className="form__label">
//                   발매일을 입력해주세요.
//               </label>
//               <input type="date" id="releasedAt" { ...register('releasedAt') } />
//               {errors.releasedAt && <p className='form__label-warning'>{errors.releasedAt.message}</p>}
//             </div>

//             <div className="form__block">
//               <label htmlFor="trailerUrl" className="form__label">
//                   트레일러 URL을 입력해주세요.
//               </label>
//               <input type="text" id="trailerUrl" { ...register('trailerUrl') } />
//               {errors.trailerUrl && <p className='form__label-warning'>{errors.trailerUrl.message}</p>}
//             </div>
//             <div className="form__block">
//               <label htmlFor="image" className="form__label">
//                   게임 이미지를 선택해주세요.
//               </label>
//               <input type="file" onChange={(e) => setimage(e)} />
//               {errors.image && <p className="form__label-warning">{errors.image.message}</p>}
//             </div>

//             <div className="form__block">
//               <label htmlFor="description" className="form__label">
//                   소개 멘트를 입력해주세요.
//               </label>
//               <textarea 
//                 id="description"
//                 spellCheck={false}
//                 rows={4}
//                 cols={40} 
//                 { ...register("description", { required : true }) }
//               />
//               {errors.description && <p className="form__label-warning">{errors.description.message}</p>}
//             </div>

//             <div className="form__btn-area">
//               <button type="submit" className="btn">미리보기</button>
//             </div>
//         </form>
//     </div>
//   )
// }
// interface FormFieldProps {
//   label: string;
//   register: any;
//   errors: any
// }
// export function FormField({ label, register, errors }: FormFieldProps) {
//   return (
//     <>
//     <label htmlFor={label} className="form__label">
//         타이틀을 입력해주세요.
//     </label>
//     <input type="text" id="title" { ...register(label) }/>
//     {errors.title && <p className="form__label-warning">{errors.title.message}</p>}
//     </>
//   );
// }