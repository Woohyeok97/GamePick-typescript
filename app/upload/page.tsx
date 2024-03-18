'use client'
import { useRouter } from "next/navigation";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// components
import MutltiForm from "@/components/form/MultiForm";
import FullOverlayWrap from "@/components/overlayWraps/FullOverlayWrap";
import GameUploadPreview from "@/components/shared/GameUploadPreview";
// hooks
import useOverlay from "@/hooks/useOverlay";
// type
import { GameFormType } from "@/interface";
import { GameFormSchema } from "../zod";
// remotes
import { createGame } from "../../remotes/axois/gameAPI";
import { createImage } from "../../remotes/axois/imageAPI";


export default function GameUploadPage() {
  const route = useRouter();
  const overlay = useOverlay();
  const { register, handleSubmit, formState: { errors }, control } = useForm<GameFormType>({
    resolver: zodResolver(GameFormSchema),
  });
  const { field: imageField } = useController({
    name: 'image',
    control: control,
  });

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file[0]) {
      imageField.onChange(file[0]);
    } else {
      imageField.onChange(null);
    }
  };

  // 게임 업로드
  const uploadGame = async (data: GameFormType) => {
    if (typeof(window) !== 'undefined' && data.image instanceof File) {
      const imageURL = await createImage(data.image)
      data = { ...data, image: imageURL };
    }
    await createGame(data);
    alert('게임을 업로드 하였습니다.');
    route.replace('/');
  };

  // 미리보기 오픈 핸들러
  const handleClick = (data: GameFormType) => {
    overlay.open((isOpen, close) => (
      <FullOverlayWrap isOpen={isOpen} close={close}>
        <GameUploadPreview game={data} onSubmit={() => uploadGame(data)} />
      </FullOverlayWrap>
    ));
  };

  return (
    <div className="page">
      <div className="page__header">
        <h2>게임 생성</h2>
      </div>
      <MutltiForm onSubmit={handleSubmit(handleClick)} errors={errors}>
        <MutltiForm.TextField label="게임 타이틀" fieldProps={{ ...register('title') }} />
        <MutltiForm.DateField label="출시일" fieldProps={{ ...register('releasedAt') }} />
        <MutltiForm.TextField label='트레일러' fieldProps={{ ...register('trailerUrl') }} />
        <MutltiForm.FileField label='게임 이미지' fieldProps={{ onChange: onChangeImage }} />
        <MutltiForm.TextareaField label='게임 소개' fieldProps={{ ...register('description') }} />
        <div className="flex flex-row-reverse mt-10">
          <button type='submit' className='px-4 btn'>
            미리보기
          </button>
        </div>
      </MutltiForm>
    </div>
  );
}