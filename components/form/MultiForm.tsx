import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';
// schema & type
import { GameFormSchema } from '@/app/zod';
import { GameFormType } from '@/interface';


interface MutltiFormProps {
  prevData?: GameFormType;
  onClick: (data: GameFormType) => void;
}
export default function MutltiForm({ prevData, onClick }: MutltiFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<GameFormType>({
    resolver: zodResolver(GameFormSchema),
  });

  useEffect(() => {
    if (prevData && GameFormSchema.parse(prevData)) {
      Object.keys(prevData).forEach(key => {
        const field = key as keyof GameFormType;
        setValue(field , prevData[field]);
      });
    }
  }, [prevData]);

  const { field: imageField } = useController({
    name: 'image',
    control: control,
  });

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file[0]) {
      setValue(imageField.name, file[0]);
    } else if (prevData?.image) {
      setValue(imageField.name, prevData.image);
    } else {
      setValue(imageField.name, '');
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit(onClick)}>
      <div className='form__block'>
        <label htmlFor='title'></label>
        <input type='text' id='title' { ...register('title') } />
        {errors.title && (
          <p className="form__label-warning">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className='form__block'>
        <label htmlFor='releasedAt'></label>
        <input type='date' id='releasedAt' { ...register('releasedAt') } />
        {errors.releasedAt && (
          <p className="form__label-warning">
            {errors.releasedAt.message}
          </p>
        )}
      </div>
      <div className='form__block'>
        <label htmlFor='trailerUrl'></label>
        <input type='text' id='trailerUrl' { ...register('trailerUrl') } />
        {errors.trailerUrl && (
          <p className="form__label-warning">
            {errors.trailerUrl.message}
          </p>
        )}
      </div>
      <div className='form__block'>
        <label htmlFor=''></label>
        <input type='file' onChange={(e) => onChangeImage(e)} />
        {errors.title && (
          <p className="form__label-warning">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className='form__block'>
        <label htmlFor='description'></label>
        <textarea 
          id="description"
          spellCheck={false}
          rows={4}
          cols={40} 
          { ...register("description") }
        />
        {errors.description && (
          <p className="form__label-warning">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="form__btn-area">
        <button type='submit' className='btn'>
          미리보기
        </button>
      </div>
    </form>
  );
}