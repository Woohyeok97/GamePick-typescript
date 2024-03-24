import { Children, cloneElement, isValidElement } from 'react';
// type
import { FieldError, FieldErrors } from 'react-hook-form';

interface MutltiFormProps {
  children: React.ReactElement[];
  onSubmit: () => void;
  errors: FieldErrors;
}

export default function MutltiForm({ children, onSubmit, errors }: MutltiFormProps) {
  const validChildren = Children.toArray(children).filter(child => isValidElement(child)) as React.ReactElement[];

  return (
    <form onSubmit={onSubmit}>
      {validChildren.map(child => {
        if (child.props.label) {
          return cloneElement(child, { error: errors[child.props.fieldProps.name] });
        }
        return child;
      })}
    </form>
  );
}

// 텍스트 필드
interface TextFieldProps {
  label: string;
  fieldProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
}

MutltiForm.TextField = ({ label, fieldProps, error }: TextFieldProps) => {
  return (
    <div className="form__block">
      <label htmlFor={label} className="form__label">{label}</label>
      <input
        type="text"
        id={label}
        className="form__input"
        { ...fieldProps }
      />
      {error && <p className="form__warning">{error.message}</p>}
    </div>
  );
}

// 날짜 필드
interface DateFieldProps {
  label: string;
  fieldProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
}

MutltiForm.DateField = ({ label, fieldProps, error }: DateFieldProps) => {
  return (
    <div className="form__block">
      <label htmlFor={label} className="form__label">{label}</label>
      <input
        type="date"
        id={label}
        className="form__input"
        { ...fieldProps }
      />
      {error && <p className="form__warning">{error.message}</p>}
    </div>
  );
}

// 파일 필드
interface FileFieldProps {
  label: string;
  fieldProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
}

MutltiForm.FileField = ({ label, fieldProps, error }: FileFieldProps) => {
  return (
    <div className="form__block">
      <label htmlFor={label} className="form__label">{label}</label>
      <input
        type="file"
        id={label}
        className="form__input"
        { ...fieldProps }
      />
      {error && <p className="form__warning">{error.message}</p>}
    </div>
  );
}

// textarea 필드
interface TextareaFieldProps {
  label: string;
  fieldProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  error?: FieldError;
}

MutltiForm.TextareaField = ({ label, fieldProps, error }: TextareaFieldProps) => {
  return (
    <div className="form__block">
      <label htmlFor={label} className="form__label">{label}</label>
      <textarea 
        spellCheck={false}
        id={label}
        className="form__input"
        { ...fieldProps }
      />
      {error && <p className="form__warning">{error.message}</p>}
    </div>
  );
}