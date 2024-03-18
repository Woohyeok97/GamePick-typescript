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
import { fetchGameById, updateGameById } from '@/remotes/axois/gameAPI';
import { createImage } from '@/remotes/axois/imageAPI';
// components
import MutltiForm from '@/components/shared/MultiForm';
import FullOverlayWrap from '@/components/overlay/FullOverlayWrap';
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
      if (typeof(window) !== 'undefined' && data.image instanceof File) {
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